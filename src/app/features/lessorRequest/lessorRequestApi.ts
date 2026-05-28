import { api } from "../../../services/axios";
import type {
    LessorRequestApiResponse,
    LessorRequestFormValues,
} from "./lessorRequestTypes";

const buildFormData = (values: LessorRequestFormValues) => {
    const formData = new FormData();

    formData.append("business_name", values.business_name);
    formData.append("phone", values.phone);
    formData.append("message", values.message);

    if (values.identity_front_image) {
        formData.append("identity_front_image", values.identity_front_image);
    }

    if (values.identity_back_image) {
        formData.append("identity_back_image", values.identity_back_image);
    }

    return formData;
};

export const submitLessorRequest = async (
    values: LessorRequestFormValues
): Promise<LessorRequestApiResponse> => {
    const formData = buildFormData(values);

    const { data } = await api.post<LessorRequestApiResponse>(
        "/v1/lessor-requests",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return data;
};