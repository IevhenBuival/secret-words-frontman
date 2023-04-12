import { useEffect, useState } from "react";
import { UnauthorizedError } from "../errors/http_errors";
import { ILanguage } from "../models/language";
import { ICharSet } from "../models/charSet";
import * as WordsApi from "./words_api";

export function useLanguages(view: boolean = true) {
  const [languages, setLanguages] = useState<ILanguage[]>([]);
  const [charSets, setCharSets] = useState<ICharSet[]>([]);
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
      if (error instanceof UnauthorizedError) setUnAuth(true);
      console.error(error);
      setShowMdbLoadingErrors(true);
      setMdbLoading(false);
    }
  }
  async function fetchCharSets() {
    try {
      setShowMdbLoadingErrors(false);
      setMdbLoading(true);
      const resivedarray = await WordsApi.fetchCharSets();
      setCharSets(resivedarray);
      setMdbLoading(false);
    } catch (error) {
      if (error instanceof UnauthorizedError) setUnAuth(true);
      console.error(error);
      setShowMdbLoadingErrors(true);
      setMdbLoading(false);
    }
  }
  useEffect(() => {
    fetchLanguages();
    fetchCharSets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    unAuth,
    showMdbLoadingErrors,
    mdbLoading,
    languages,
    charSets,
    setLanguages,
  };
}
