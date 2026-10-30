"""Usage: python adobe_csv.py output
Writes output/adobe_stock.csv (Adobe Stock format: Filename,Title,Keywords,Category,Releases) and output/metadata_full.csv
for every clip that exists in that folder."""
import csv,os,sys
from concepts import CONCEPTS
from adobe_meta import ADOBE,BANNED
def clean(kw):
    out=[];seen=set()
    for k in [x.strip() for x in kw.split(',')]:
        l=k.lower()
        if not l or l in seen or any(b in l for b in BANNED):continue
        seen.add(l);out.append(k)
    return out[:49]
if __name__=='__main__':
    d=sys.argv[1] if len(sys.argv)>1 else 'output';stem=lambda c:c['file'].rsplit('.',1)[0]
    def found(c):
        for sub in ('adobe_upload_4k',''):
            for e in ('mp4','mov'):
                f=os.path.join(d,sub,stem(c)+'.'+e)
                if os.path.exists(f):return os.path.basename(f)
        return None
    have=[dict(c,file=found(c)) for c in CONCEPTS if found(c)]
    with open(os.path.join(d,'adobe_stock.csv'),'w',newline='',encoding='utf-8') as f:
        w=csv.writer(f);w.writerow(['Filename','Title','Keywords','Category','Releases'])
        for c in have:
            t,cat=ADOBE[c['id']];assert len(t)<=200;w.writerow([c['file'],t,','.join(clean(c['keywords'])),cat,''])
    with open(os.path.join(d,'metadata_full.csv'),'w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=['id','file','title','description','keywords','category','seamless_loop','has_baked_text']);w.writeheader()
        for c in have:w.writerow({k:c[k] for k in w.fieldnames})
    print(len(have),'clips in CSV')
