export default function OldToNewUrl(oldurls,newurls){
    let url = window.location.href.split('.com')[1];
    for(let i=0;i<oldurls.length;i++){
        if(url == oldurls[i]){
            return window.location.replace(newurls[i])
            break;
        }
    }
}