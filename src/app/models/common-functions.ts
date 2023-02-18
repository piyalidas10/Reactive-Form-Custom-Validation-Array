import { ErrorModel } from "./error-msg";

export function RequiredMsgFunc(fieldName: string): ErrorModel {
    const requiredMsg: Required<ErrorModel> = {
        message: `${fieldName} is required`,
        I18N: {
            source: `${fieldName} is required`,
            desc: `${fieldName} required error message`,
        },
    }
    return requiredMsg;
}