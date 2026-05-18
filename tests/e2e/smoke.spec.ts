import { expect, test } from "@playwright/test";

test("searches and selects a character", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("搜索角色").fill("迪奥");
  await expect(page.getByText("节点：1")).toBeVisible();
  await expect(page.getByTestId("graph-canvas")).toBeVisible();
});

test("filters relationship types and resets", async ({ page }) => {
  await page.goto("/");
  await page.getByLabel("按关系类型筛选").selectOption("rivalry");
  await expect(page.getByText("关系：2")).toBeVisible();
  await page.getByRole("button", { name: "重置" }).click();
  await expect(page.getByText("关系：9")).toBeVisible();
});

