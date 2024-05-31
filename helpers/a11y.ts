import AxeBuilder from "@axe-core/playwright";
import { TestInfo, expect } from "@playwright/test";

interface Violation {
  id: string;
  nodes: { target: string }[];
}

class A11yHelper {
  public async compareFingerPrints(
    page,
    testInfo: TestInfo,
    pageName: string,
  ): Promise<void> {
    const accessibilityScanResults = await new AxeBuilder(page)
      .withTags([`wcag2a`])
      .analyze();
    await testInfo.attach(pageName, {
      body: JSON.stringify(accessibilityScanResults, null, 2),
      contentType: `application/json`,
    });
    expect
      .soft(this.violationFingerprints(accessibilityScanResults))
      .toMatchSnapshot();
  }
  violationFingerprints(accessibilityScanResults: any): string {
    const violationFingerprints: Violation[] =
      accessibilityScanResults.violations.map((violation: any) => ({
        rule: violation.id,
        targets: violation.nodes.map((node: { target: string }) => node.target),
      }));

    return JSON.stringify(violationFingerprints, null, 2);
  }
}
export default new A11yHelper();
