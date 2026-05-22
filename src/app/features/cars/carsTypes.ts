export const CAR_TYPE_VALUES = [
    "sedan",
    "van",
    "suv",
    "hatchback",
    "truck",
] as const;

export type CarTypeValue = (typeof CAR_TYPE_VALUES)[number];

export const CAR_TYPE_OPTIONS: ReadonlyArray<{
    value: CarTypeValue;
    label: string;
}> = [
    { value: "sedan", label: "Sedan" },
    { value: "van", label: "Van" },
    { value: "suv", label: "SUV" },
    { value: "hatchback", label: "Hatchback" },
    { value: "truck", label: "Truck" },
] as const;

export interface CarType {
    id: number;
    name: string;
}

export interface CarOwner {
    id: number;
    name: string;
}

export interface CarFeature {
    id: number;
    name: string;
}

export interface CarImages {
    main: string | null;
    gallery: string[];
}

export interface Car {
    id: number;
    title: string;
    brand: string;
    model: string;
    year: number;
    car_type: CarType;
    price_per_day: string;
    status: string;
    color: string | null;
    plate_number: string | null;
    description: string | null;
    owner: CarOwner;
    images: CarImages;
    features: CarFeature[];
    created_at: string;
}

export interface PaginationLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface CarsMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: PaginationLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface CarsLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

export interface CarsResponse {
    data: Car[];
    links: CarsLinks;
    meta: CarsMeta;
}

export interface CarsFilters {
    carType: CarTypeValue | "";
    model: string;
    maxPrice: number;
}

export type CarsSortOption = "featured" | "price_low_to_high" | "price_high_to_low";

export interface CarsState {
    items: Car[];
    loading: boolean;
    error: string | null;
    filters: CarsFilters;
    searchTerm: string;
    sortBy: CarsSortOption;
    meta: CarsMeta | null;
    links: CarsLinks | null;
}