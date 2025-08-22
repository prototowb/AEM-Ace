/* empty css                                */
import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"z5tty2va","dataset":"production","useCdn":true}
          );

globalThis.sanityClient = sanityClient;
