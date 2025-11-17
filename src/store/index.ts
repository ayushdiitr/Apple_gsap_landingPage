import {create} from "zustand";

const useMacbookStore = create((set) => ({
    color: '#2e2c2e',
    setColor: (color:string) => set({color}),

    scale: 0.08,
    setScale: (scale:number) => set({scale}),

    texture: '/videos/feature-1.mp4',
    setTexture : (txt:string) => set({txt}),

    reset: () => set({color: '#2c2c2e', scale: 0.08, txt: '/videos/feature-1.mp4'})
}))

export default useMacbookStore;