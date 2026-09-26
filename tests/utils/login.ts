import { Page } from "@playwright/test";

export async function login(page: Page, email: string, password: string): Promise<void> {

    await page.goto('/login');
    await page.getByLabel('Email').fill(email);
    await page.getByLabel('Contraseña').fill(password);
    await page.getByRole('button', {name: 'Ingresar'}).click();

    

}
