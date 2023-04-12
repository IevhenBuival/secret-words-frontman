import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import NavBar from "./components/NavBar/NavBar";
import SignUpModal from "./components/SignUpModal";
import { getLoggedUser } from "./hooks/words_api";
import { IUser } from "./models/user";
import LanguagePage from "./components/Pages/LanguagePage";
import NotFoundPage from "./components/Pages/NotFoundPage";
import PageContainer from "./components/Pages/PageContainer";
import WordsPageView from "./components/Pages/WordsPageView";
import UsersPage from "./components/Pages/UsersPage";

function App() {
  const [loginUser, setLoginUser] = useState<IUser | null>(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    async function fetchLoginedUser() {
      try {
        const user = await getLoggedUser();
        setLoginUser(user);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLoginedUser();
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        loggedInUser={loginUser}
        onLogOut={() => setLoginUser(null)}
        onLoginClicked={() => setShowLoginModal(true)}
        onSignupClicked={() => setShowSignUpModal(true)}
      />

      <Routes>
        <Route
          path="/"
          element={
            <PageContainer loginUser={loginUser}>
              <WordsPageView />
            </PageContainer>
          }
        />
        <Route
          path="/Language"
          element={
            <PageContainer loginUser={loginUser}>
              <LanguagePage />
            </PageContainer>
          }
        />
        <Route
          path="/users"
          element={
            <PageContainer loginUser={loginUser}>
              <UsersPage loginUser={loginUser} />
            </PageContainer>
          }
        />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      {showSignUpModal && (
        <SignUpModal
          onDismiss={() => setShowSignUpModal(false)}
          onSignUp={(user) => {
            setLoginUser(user);
            setShowSignUpModal(false);
          }}
        />
      )}

      {showLoginModal && (
        <LoginModal
          onDismiss={() => {
            setShowLoginModal(false);
          }}
          onLogin={(user) => {
            setLoginUser(user);
            setShowLoginModal(false);
          }}
        />
      )}
    </BrowserRouter>
  );
}

export default App;
