/** biome-ignore-all lint/complexity/noBannedTypes: the {} is needed here */

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K;
}[keyof T];
