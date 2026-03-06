import {test} from "@playwright/test"

test("icc-ranking-task-2", async({page})=>{
  await page.goto("https://www.icc-cricket.com/rankings")
  let ranking=await page.locator('//section[@id="mens-batting-rankings"]/descendant::div[@class="swiper-slide max-w-[328px] lg:max-w-[450px] mr-3 lg:mr-0 last:mr-0 swiper-slide-next"]/child::div/child::div/table[@class="w-full border-collapse"]/descendant::span[@class="text-xs font-extrabold uppercase text-primary pr-2" and .=2]').innerText()
  console.log(ranking)
  //virat odi ranking
  let time=new Date().getTime()
  await page.screenshot({path:`./screenshots2/day12-task2-sc-${time}.png`})
})