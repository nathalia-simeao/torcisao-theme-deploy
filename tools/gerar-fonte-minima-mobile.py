"""Gera overrides 'mínimo 12px no celular' para toda regra de CSS do tema cujo font-size < 12px."""
import re,sys,glob,os
ROOT=sys.argv[1]; OUT=sys.argv[2]
MIN=12.0; VW=375
def strip_comments(s): return re.sub(r'/\*.*?\*/','',s,flags=re.S)
def px(tok):
    tok=tok.strip().lower()
    m=re.fullmatch(r'(-?\d*\.?\d+)(px|rem|em|vw|%)?',tok)
    if not m: return None
    v=float(m.group(1)); u=m.group(2) or ''
    return {'px':v,'rem':v*16,'em':v*16,'vw':v*VW/100,'%':v*16/100,'':None}.get(u)
def size_px(val):
    v=val.replace('!important','').strip()
    m=re.match(r'clamp\(([^,]+),([^,]+),(.+)\)$',v)
    if m:
        lo=px(m.group(1)); mid=px(m.group(2)); hi=px(m.group(3))
        if lo is None and mid is None: return None
        val=mid if mid is not None else lo
        if hi is not None: val=min(val,hi)
        return max(lo,val) if lo is not None else val
    m=re.match(r'(min|max)\((.+)\)$',v)
    if m:
        parts=[px(p) for p in m.group(2).split(',')]; parts=[p for p in parts if p is not None]
        if not parts: return None
        return min(parts) if m.group(1)=='min' else max(parts)
    if v.startswith('calc') or v.startswith('var'): return None
    return px(v)
def font_short_size(val):
    v=re.sub(r"(['\"]).*?\1",'',val)  # remove nomes de fonte entre aspas
    for tok in v.replace(',',' ').split():
        t=tok.split('/')[0]
        if re.fullmatch(r'-?\d*\.?\d+(px|rem|em|vw|%)',t) and not re.fullmatch(r'\d{3}',t):
            return t
        if t.startswith('clamp('): return None
    return None
def mobile_relevant(cond):
    c=cond.lower()
    m=re.search(r'min-width\s*:\s*(\d+)',c)
    if m and int(m.group(1))>=768: return False
    if 'print' in c and 'screen' not in c: return False
    return True
rules=[]  # (media_conds, selector, value)
def parse(css, conds):
    i=0;n=len(css)
    while i<n:
        j=css.find('{',i)
        if j<0: break
        head=css[i:j].strip()
        # acha o bloco balanceado
        depth=1;k=j+1
        while k<n and depth:
            if css[k]=='{': depth+=1
            elif css[k]=='}': depth-=1
            k+=1
        body=css[j+1:k-1]
        if head.startswith('@media'):
            cond=head[6:].strip()
            if mobile_relevant(cond): parse(body, conds+[cond])
        elif head.startswith('@supports'):
            parse(body, conds)
        elif head.startswith('@'):
            pass
        else:
            sel=head.split(';')[-1].strip()
            if sel and '{' not in body:
                for decl in body.split(';'):
                    if ':' not in decl: continue
                    p,_,v=decl.partition(':'); p=p.strip().lower(); v=v.strip()
                    if p=='font-size':
                        s=size_px(v)
                        if s is not None and 0<s<MIN: rules.append((tuple(conds),sel,v.replace('!important','').strip()))
                    elif p=='font':
                        t=font_short_size(v)
                        s=px(t) if t else None
                        if s is not None and 0<s<MIN: rules.append((tuple(conds),sel,t))
        i=k
files=sorted(glob.glob(os.path.join(ROOT,'assets','*.css')))+[os.path.join(ROOT,'style.css')]
for f in files: parse(strip_comments(open(f,encoding='utf-8').read()),[])
for f in glob.glob(os.path.join(ROOT,'**','*.php'),recursive=True):
    for blk in re.findall(r'<style[^>]*>(.*?)</style>',open(f,encoding='utf-8').read(),flags=re.S):
        if '<?php' in blk: blk=re.sub(r'<\?php.*?\?>','',blk,flags=re.S)
        parse(strip_comments(blk),[])
# agrupa por condição de media e valor
from collections import OrderedDict
groups=OrderedDict()
SKIP=('tor-footer-industrial-label','tq-medal-core','tpe-lens','angle-picker','tor-industrial-word','tor-year-medal')
for conds,sel,val in rules:
    sel=','.join(x for x in sel.split(',') if not any(k in x for k in SKIP))
    if not sel.strip(): continue
    groups.setdefault(conds,OrderedDict()).setdefault(val,[]).append(sel)
out=['/* GERADO: mínimo de 12px de fonte no celular (Lighthouse "tamanho de fonte legível").\n   Regenerar ao criar estilos novos com fonte < 12px. */']
total=0
for conds,byval in groups.items():
    inner=[]
    for val,sels in byval.items():
        sels=list(OrderedDict.fromkeys(sels)); total+=len(sels)
        inner.append(','.join(sels)+'{font-size:max(12px,'+val+')!important}')
    block='\n'.join(inner)
    for c in reversed(conds): block='@media '+c+'{\n'+block+'\n}'
    out.append(block)
EXTRA = """/* Barra de Black Friday (#tbf-bar) e letreiro (.tfx) vêm de um snippet do WPCode, fora do tema */
#tbf-bar .tbf-l{font-size:12px!important;margin-top:2px!important;letter-spacing:.5px!important}
#tbf-bar .tbf-tt,#tbf-bar .tbf-pct{font-size:12px!important}
.tfx-seg em,.tfx-k small{font-size:12px!important}"""
out.append(EXTRA)
css='@media (max-width:767.98px){\n'+'\n'.join(out)+'\n}\n'
css += """
/* Largura da página = largura da tela (Lighthouse "content-width"): nada pode criar rolagem lateral */
html,body{max-width:100%}
@supports (overflow:clip){html,body{overflow-x:clip}}
@supports not (overflow:clip){body{overflow-x:hidden}}
@media (max-width:767.98px){
  #hs-interactives-modal-overlay,#hs-interactives-modal-overlay iframe,iframe[aria-label="Popup CTA"]{max-width:100vw!important}
}
"""
open(OUT,'w',encoding='utf-8').write(css)
print('regras',total,'bytes',len(css))
