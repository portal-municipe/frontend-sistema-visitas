import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import localeEn from '@angular/common/locales/en';

registerLocaleData(localePt);
registerLocaleData(localeEn);

type Lang = 'pt' | 'en';

const STORAGE_KEY = 'app.lang';
const FALLBACK: Lang = 'pt';
@Injectable({ providedIn: 'root' })
export class LanguageService {
    readonly supported: Lang[] = ['pt', 'en'];
    current: Lang = FALLBACK;

    constructor(private t: TranslateService) { }

    init(): Promise<void> {
        const saved = (localStorage.getItem(STORAGE_KEY) || '') as Lang;
        const browser = ((navigator.language || 'pt').slice(0, 2) as Lang);
        const initial: Lang =
            (saved && this.supported.indexOf(saved) >= 0 ? saved :
                this.supported.indexOf(browser) >= 0 ? browser : FALLBACK);

        this.set(initial, false);
        return Promise.resolve(); // importante para o APP_INITIALIZER
    }

    set(lang: Lang, persist: boolean = true) {
        this.current = lang;
        this.t.setDefaultLang(FALLBACK);
        this.t.use(lang);
        if (persist) localStorage.setItem(STORAGE_KEY, lang);
        document.documentElement.lang = lang;
    }
}
