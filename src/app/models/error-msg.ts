export interface ErrorModel {
    message: string;
    I18N: LocalizeInterface;
}

export interface LocalizeInterface {
    source: string;
    desc: string;
}

export const ErrorMsg: Record<string, ErrorModel> = {
    REQUIRED: {
        message: 'Enter a valid Email Address',
        I18N: {
            source: 'Enter a valid Email Address',
            desc: 'Email format error message',
        },
    },
    EMAIL: {
        message: 'Enter a valid Email Address',
        I18N: {
            source: 'Enter a valid Email Address',
            desc: 'Email format error message',
        },
    },
    MINLENGTH: {
        message: 'Minimum chaaracters are required',
        I18N: {
            source: 'Minimum chaaracters are required',
            desc: 'Minimum length error message',
        },
    },
    MAXLENGTH: {
        message: 'Maximum chaaracters are allowed',
        I18N: {
            source: 'Maximum chaaracters are allowed',
            desc: 'Maximum length error message',
        },
    },
    URL: {
        message: 'Enter a valid URL',
        I18N: {
            source: 'Enter a valid URL',
            desc: 'Valid Url error message',
        },
    },
    MOBILE: {
        message: 'Enter a valid Mobile No',
        I18N: {
            source: 'Enter a valid Mobile No',
            desc: 'Valid Mobile no error message',
        },
    },
    YEAR: {
        message: 'Enter a valid Year',
        I18N: {
            source: 'Enter a valid Year',
            desc: 'Valid Year error message',
        },
    },
    ZIP: {
        message: 'Enter a valid Zipcode',
        I18N: {
            source: 'Enter a valid Zipcode',
            desc: 'Valid Zipcode error message',
        },
    },
};
