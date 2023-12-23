import { IGalleryItem } from "@/ui/Gallery/GalleryInterface";
import { ISlide } from "@/ui/Slider/SliderInterface";

export interface IHome {
        slides: ISlide[]
        trendingMovies: IGalleryItem[]
	actors: IGalleryItem[]
}
