import type { APIRoute, GetStaticPaths } from 'astro';
import { ogSpecs, renderOg, type OgSpec } from '../../lib/og';

// Her sayfa tipi için 1200×630 paylaşım görseli: /og/<ad>.jpg
export const getStaticPaths = (() => ogSpecs().map((spec) => ({ params: { slug: spec.slug }, props: { spec } }))) satisfies GetStaticPaths;

export const GET: APIRoute<{ spec: OgSpec }> = async ({ props }) =>
  new Response(new Uint8Array(await renderOg(props.spec)), { headers: { 'Content-Type': 'image/jpeg' } });
