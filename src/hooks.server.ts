import type { Handle } from '@sveltejs/kit';
import { i18n } from '$lib/i18n';
import { sequence } from '@sveltejs/kit/hooks';
import { handleLogto } from '@logto/sveltekit';
import { env } from '$env/dynamic/private';

const handleParaglide: Handle = i18n.handle();
const handlePg: Handle = handleParaglide;

const handleLg = handleLogto(
    {
        endpoint: env.LOGTO_ENDPOINT,
        appId: env.LOGTO_APP_ID,
        appSecret: env.LOGTO_APP_SECRET,
        scopes: ['email', 'profile', 'openid']  
    },
    { 
        encryptionKey: env.LOGTO_COOKIE_ENCRYPTION_KEY,
        navigateUrl: {
            signIn: '/',     
            signOut: '/'     
        }
    }
);

export const handle = sequence(handleLg, handlePg);
