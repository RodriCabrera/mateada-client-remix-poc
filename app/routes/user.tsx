import { ActionFunctionArgs, json } from "@remix-run/node";

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();

  const res = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    body,
  });

  return json(res.status);
};
