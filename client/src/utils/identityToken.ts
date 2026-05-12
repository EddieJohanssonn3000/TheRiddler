export function saveIdentityTokenFromUrl(): void {
  const params = new URLSearchParams(window.location.search);
  const identityToken = params.get("identity_token");

  if (!identityToken) {
    return;
  }

  window.sessionStorage.setItem("identityToken", identityToken);

  window.history.replaceState({}, "", window.location.pathname);
}

export function getIdentityToken(): string | null {
  return window.sessionStorage.getItem("identityToken");
}
