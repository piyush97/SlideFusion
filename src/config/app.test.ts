import assert from "node:assert/strict";
import { ROUTES, WAITLIST_PATH } from "./app";

describe("app config", () => {
  test("keeps core routes stable", () => {
    assert.equal(ROUTES.dashboard, "/dashboard");
    assert.equal(ROUTES.presentation, "/presentation");
    assert.equal(ROUTES.waitlist, WAITLIST_PATH);
  });
});
