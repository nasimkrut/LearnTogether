import {test, expect} from "@playwright/test";

test.describe('Создание нового поста', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/main');
  });
  test('Пользователь может создать пост', async ({ page }) => {
    await page.goto();

    await page.click('text=Не нашлось подходящего объявления? Создай его сам!');

    await page.click('div[class*="modal-content"]:has(placeholder="Нужна помощь с предметом.."])');
    await page.click('text=Математика');
    // await page.click('text=Математика');
    await page.fill('input[name="description"]', 'Помогите');
    await page.locator('#select-help-subjects').click()
    await page.click('text=Теория вероятностей');
    await page.click('text=C#');

    await page.fill('input[name="tags"]', 'математика, помощь, задачи');

    await page.click('button:has-text("Создать")');

    const successMessage = await page.locator('text=Пост успешно создан');
    await expect(successMessage).toBeVisible();
  })
});