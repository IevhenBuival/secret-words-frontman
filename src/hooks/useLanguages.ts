import { useEffect, useState } from "react"
import { UnauthorizedError } from "../errors/http_errors";
import { ILanguage } from "../models/language"
import * as WordsApi from "./words_api";

export function useLanguages(view: boolean = true) {
    const [languages, setLanguages] = useState<ILanguage[]>([]);
    const [mdbLoading, setMdbLoading] = useState(true);
    const [showMdbLoadingErrors, setShowMdbLoadingErrors] = useState(false);
    const [unAuth, setUnAuth] = useState(false);

    async function fetchLanguages() {
        try {
            setShowMdbLoadingErrors(false);
            setMdbLoading(true);
            if (view) {
                const resivedarray = await WordsApi.fetchLanguages();
                setLanguages(resivedarray);
            } else {
                const resivedarray = await WordsApi.fetchLanguagesview();
                setLanguages(resivedarray);
            }
            setMdbLoading(false);
        } catch (error) {
            if (error instanceof UnauthorizedError) setUnAuth(true)
            console.error(error);
            setShowMdbLoadingErrors(true);
            setMdbLoading(false);
        }
    }

    useEffect(() => {
        fetchLanguages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return { unAuth, showMdbLoadingErrors, mdbLoading, languages, setLanguages }
}
