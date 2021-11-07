import axios from "axios";
import { ImageId } from "../redux";

/*
 * str: chuoi cat
 * maxlimit: do dai toi da, cat - 3 ki tu
 */
export function SlugStr(str: string, maxlimit: number): string {
    if (str.length >= maxlimit) {
        return str.substring(0, maxlimit - 3);
    }
    return str
}

export const cansa =
    ["\x68\x74\x74\x70\x3A\x2F\x2F\x31\x30\x33\x2E\x32\x30\x37\x2E\x33\x38\x2E\x32\x30\x30\x3A\x33\x30\x30\x32",
        "https://103.207.38.200:443"];

export function vnd(n: number | string) {
    return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function saveImage(img: any, obj: ImageId) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data;'
        }
    };
    var data = new FormData();
    data.append('file', img);
    return axios.post(`${cansa[0]}/api/image/save/e4611a028c71342a5b083d2cbf59c494`, data, config).then(
        (resp: any) => {
            const avatar_user = resp.data.data.image_id;
            obj.id = avatar_user;
        });
}

export function updateImage(img: any, id_avatar: number, obj: ImageId) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data;'
        }
    };
    var data = new FormData();
    data.append('file', img);
    return axios.post(`${cansa[0]}/api/image/update/${id_avatar}/e4611a028c71342a5b083d2cbf59c494`, data, config).then(
        (resp: any) => {
            const avatar_user = resp.data.data.image_id;
            obj.id = avatar_user;
        });
}