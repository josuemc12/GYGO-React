import Swal from "sweetalert2";

export async function fetchWithAuth(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    credentials: "include", // incluir cookies siempre
  });


  return response;
}