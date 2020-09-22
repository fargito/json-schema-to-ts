import { Get } from "../../utils";

import { MetaType, Never, Arr, Error } from "..";
import { Values } from "../array";

import { IntersectConst } from "./const";
import { IntersectEnum } from "./enum";
import { IntersectTuple } from "./tuple";
import { ClearIntersections, Intersect } from "./index";

export type ClearArrIntersections<A> = Arr<ClearIntersections<Values<A>>>;

export type IntersectArr<A, B> = {
  any: A;
  never: Never;
  const: IntersectConst<B, A>;
  enum: IntersectEnum<B, A>;
  primitive: Never;
  array: IntersectArrs<A, B>;
  tuple: IntersectTuple<B, A>;
  object: Never;
  union: Intersect<B, A>;
  intersection: Error<"Cannot intersect intersection">;
  error: B;
  errorTypeProperty: Error<"Missing type property">;
}[Get<B, "type"> extends MetaType ? Get<B, "type"> : "errorTypeProperty"];

type IntersectArrs<A, B, I = Intersect<Values<A>, Values<B>>> = I extends Never
  ? Never
  : Arr<I>;
