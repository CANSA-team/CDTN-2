/*
 * str: chuoi cat
 * maxlimit: do dai toi da, cat - 3 ki tu
 */
export function SlugStr(str:string,maxlimit:number):string{
    if (str.length >= maxlimit) {
        return str.substring(0,maxlimit-3) + '...';
    }
    return str
}

