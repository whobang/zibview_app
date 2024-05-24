import { z } from "zod";

/**
 * @description zod 스키마의 기본값을 반환하는 함수
 */
export const getDefaults = <Schema extends z.AnyZodObject>(schema: Schema) => {
  return Object.fromEntries(
    Object.entries(schema.shape).map(([key, value]) => {
      if (value instanceof z.ZodDefault)
        return [key, value._def.defaultValue()];
      return [key, undefined];
    })
  );
};
