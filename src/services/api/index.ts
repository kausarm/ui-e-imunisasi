import callAPI from "../../config";

const ROOT_API = import.meta.env.VITE_APP_API_URL;

export async function sendImunisasi(data:any) {
  const URL = "imunisasi";

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "POST",
    data,
  });
}

export async function getImunisasi(limit:number, offset:number) {
  const URL = `imunisasi?limit=${limit}&offset=${offset}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getImunisasiById(id:string) {
  const URL = `imunisasi/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

export async function getPuskesmas() {
  const URL = `data-puskesmas`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}

// CARI DATA IMUNISASI
export async function getImunisasiKeyword(limit: number, offset: number,keyword:string) {
  const URL = `imunisasi?limit=${limit}&offset=${offset}&keyword=${keyword}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "GET",
  });
}


export async function updateImunisasi(id:string, data:any) {
  const URL = `imunisasi/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "PUT",
    data
  });
}

export async function deleteImunisasi(id:string) {
  const URL = `imunisasi/${id}`;

  const url = `${ROOT_API}/${URL}`;

  return callAPI({
    url,
    method: "DELETE",
  });
}
