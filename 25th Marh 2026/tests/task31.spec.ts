import { test, expect, Locator } from "@playwright/test";
import { accountpage } from "../pom/pom";
import { transactionpage } from "../pom/transaction";
import { managerpage } from "../pom/manager.ts";
import { customerpage } from "../pom/customer.ts";
import userData from "../utility/data.json";

test("Banking System", async ({ page }) => {

  const account = new accountpage(page);
  const transaction = new transactionpage(page);
  const manager = new managerpage(page);
  const customer = new customerpage(page);

  await manager.navigate(userData);
  await manager.managerLogin();
  await manager.addCustomer();
  await manager.customerCreation(userData);
  await manager.home();
  await manager.openAccount();
  await manager.home();
  await customer.customerLogin();
  await customer.selectCustomer();
  await transaction.deposit(userData);
  await transaction.depositSuccess();
  await transaction.withdrawal(userData);
  await transaction.withdrawalSuccess();
  await transaction.balanceValidate(userData);
  await transaction.screenshot();
  await transaction.logout();
});