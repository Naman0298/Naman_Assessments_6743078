import { test } from "@playwright/test";

test("Tokyo medal",async({page})=>{
   await page.goto("https://www.olympics.com/en/olympic-games/tokyo-2020")
   await page.locator("//a[@href='/en/olympic-games/tokyo-2020/athletes' and @class='primary']").click()
   await page.locator("//h3[@class='sc-d8cd2c5-3 ewwlft' and .='Emma MCKEON']").click();
   const medal=await page.locator("//span[@class='OcsText-styles__StyledText-sc-bf256156-0 cjPVFu text--sm-body' and .='6']").textContent();
   console.log(medal);
   await page.screenshot({path:"./screenshots2/medal.png"})
   

})