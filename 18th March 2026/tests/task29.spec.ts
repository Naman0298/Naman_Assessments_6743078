import { test } from "@playwright/test"
import fs from "fs"
import path from "path"
import { UploadPage } from "../pomPage/uploadPage"

const data = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../testdata/uploadData.json"), "utf-8")
)
test("Upload file using JSON data", async ({ page }) => {
  const uploadPage = new UploadPage(page)
  await uploadPage.goto()
  await uploadPage.uploadFile(data.filePath)
  await uploadPage.clickUpload()
  await uploadPage.verifyUploadedFile(data.expectedFileName)
})