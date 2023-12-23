import { TypeMaterialIconName } from "@/shared/types/iconTypes";
export interface IMenuItem {
    title: string,
    icon: TypeMaterialIconName,
    link: string,
}
export interface IMenu {
    title: string,
    items: IMenuItem[]
}