import { assertEquals } from "testing/asserts.ts";
import { hex, ligthnessContrast } from "./mod.ts";

Deno.test("APCA is calculated correctly", () => {
  assertEquals(ligthnessContrast(hex("#1234b0"), hex("#e9e4d0")), 75.6);
  assertEquals(ligthnessContrast(hex("#e9e4d0"), hex("#1234b0")), -78.3);

  assertEquals(ligthnessContrast(hex("#fff"), hex("#000")), -107.9);
  assertEquals(ligthnessContrast(hex("#000"), hex("#fff")), 106);

  assertEquals(ligthnessContrast(hex("#00ff00"), hex("#fff")), 17.1);
  assertEquals(ligthnessContrast(hex("#fff"), hex("#00ff00")), -19.6);

  assertEquals(ligthnessContrast(hex("#2e2e2e"), hex("#fff")), 100.1);
  assertEquals(ligthnessContrast(hex("#fff"), hex("#2e2e2e")), -103.2);

  assertEquals(ligthnessContrast(hex("0079ad"), hex("#2e2e2e")), -24.1);
  assertEquals(ligthnessContrast(hex("#2e2e2e"), hex("0079ad")), 25.2);

  assertEquals(ligthnessContrast(hex("#e42189"), hex("#0d0330")), -33.3);
  assertEquals(ligthnessContrast(hex("#0d0330"), hex("#e42189")), 35.6);

  assertEquals(ligthnessContrast(hex("#fff4cc"), hex("#3a1209")), -98.3);
  assertEquals(ligthnessContrast(hex("#3a1209"), hex("#fff4cc")), 96.4);

  assertEquals(ligthnessContrast([136, 136, 136], [255, 255, 255]), 63.1);
  assertEquals(ligthnessContrast([255, 255, 255], [136, 136, 136]), -68.5);
  assertEquals(ligthnessContrast([0, 0, 0], [170, 170, 170]), 58.1);
  assertEquals(ligthnessContrast([170, 170, 170], [0, 0, 0]), -56.2);
  assertEquals(ligthnessContrast([17, 34, 51], [221, 51, 255]), 40.1);
  assertEquals(ligthnessContrast([221, 51, 255], [17, 34, 51]), -38.4);
  assertEquals(ligthnessContrast([17, 34, 51], [68, 68, 68]), 8.3);
  assertEquals(ligthnessContrast([68, 68, 68], [17, 34, 51]), -7.5);
});
