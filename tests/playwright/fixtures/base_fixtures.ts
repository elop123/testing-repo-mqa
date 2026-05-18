import {Page} from 'playwright';
import {test as base} from '@playwright/test';
import {BasicFormComponent} from '../support/components/forms/BasicFormComponent';
import {UsingGridComponent} from '../support/components/forms/UsingGridComponent';
import {InlineFormComponent} from '../support/components/forms/InlineFormComponent';
import {ApplicationURLs} from '../support/main/ApplicationURLs';



type MyFixtures = {
onBasicForm: BasicFormComponent;
onGridForm: UsingGridComponent;
onInlineForm: InlineFormComponent;
onApplicationURLs: ApplicationURLs;
}

const createFixture = <T>(Component: new (page: Page) => T) => {
return async ({ page }: { page: Page }, use: (fixture: T) => Promise<void>) => {
await use(new Component(page));
};
};

export const test = base.extend<MyFixtures>({
onBasicForm: [createFixture(BasicFormComponent), { scope: 'test' }],
onGridForm: [createFixture(UsingGridComponent), { scope: 'test' }],
onInlineForm: [createFixture(InlineFormComponent), { scope: 'test' }],
onApplicationURLs: [createFixture(ApplicationURLs), { scope: 'test' }],
});

export {expect} from '@playwright/test';