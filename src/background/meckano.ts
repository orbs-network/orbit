const BASE_URL = "https://app.meckano.co.il/api";

function buildBody(method: 'create' | 'read', data: Object): string {
    return `_method=${method}&data=${encodeURIComponent(JSON.stringify(data))}`;
}

function buildOptions(method: 'create' | 'read', data: object): RequestInit {
    const body = buildBody(method, data);
    return {
        "credentials": "include",
        "headers": {
            "Accept": "*/*",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36",
            "X-Requested-With": "XMLHttpRequest",
            "Pragma": "no-cache",
            "Cache-Control": "no-cache",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "en-US,en;q=0.9,he;q=0.8",
        },
        "body": body,
        "method": "POST",
        "mode": "cors"
    }
};

type TAPICallResult = {
    ok: boolean;
    resultData?: any;
}

async function callMeckanoAPI(apiName: 'login' | 'timeEntry', method: 'create' | 'read', data: object): Promise<TAPICallResult> {
    console.log(`calling /${apiName} API`);
    const res = await fetch(`${BASE_URL}/${apiName}/`, buildOptions(method, data));

    if (res.status !== 200) {
        return { ok: false }
    };

    const text = await res.text(); // api might return text...
    let resultJson: any;
    try {
        resultJson = JSON.parse(text);
    } catch (err) {
        console.log(`/${apiName} API call failed, can't parse text to JSON: ${text}`);
        return { ok: false };
    }
    if (resultJson.status === 0) {
        console.log(`/${apiName} API call success`);
        return { ok: true, resultData: resultJson.data };
    } else {
        console.log(`/${apiName} API call failed`);
        return { ok: false, resultData: resultJson.data };
    }
}

export async function login(email, password): Promise<boolean> {
    const data = {
        email,
        password,
        cookie: true,
        language: '',
        verificationCode: '',
        loginWithGoogle: false,
        image: false
    };

    const { ok } = await callMeckanoAPI('login', 'create', data);
    return ok;
}

export async function reportEnter(): Promise<boolean> {
    const data = {
        id: null,
        userId: null,
        userName: null,
        isOut: false,
        ts: null,
        mts: null
    }

    const { ok } = await callMeckanoAPI('timeEntry', 'create', data);
    return ok;
}

export async function reportExit(): Promise<boolean> {
    const data = {
        id: null,
        userId: null,
        userName: null,
        isOut: true,
        ts: null,
        mts: null
    }

    const { ok } = await callMeckanoAPI('timeEntry', 'create', data);
    return ok;
}

export async function getStatus(): Promise<any> {
    const data = {
        id: null,
        userId: null,
        userName: null,
        isOut: true,
        ts: null,
        mts: null
    }

    const { ok, resultData } = await callMeckanoAPI('timeEntry', 'read', data);
    return { ok, resultData };
}
