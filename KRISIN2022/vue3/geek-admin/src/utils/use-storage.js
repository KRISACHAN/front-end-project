import { ref, watchEffect } from "vue";
export default function useStorage(name, value=[]){
    const localName = localStorage.getItem(name);
    let data = ref(localName ? JSON.parse(localName) : value);
    watchEffect(()=>{
        localStorage.setItem(name,JSON.stringify(data.value))
    })
    return data
}