import { hc } from 'hono/client';

import type { ApiRoutes } from '@/app/api/[[...route]]/route';

export const client = hc<ApiRoutes>(process.env.NEXT_PUBLIC_APP_URL!);
