export default function ({ $auth, redirect, route }) {
  const emailNotVerifiedPath = '/email-not-verified';

  if ([
    emailNotVerifiedPath,
    '/verify-email-address/',
  ].indexOf(route.path) === -1) {
    if (!$auth.user.email_verified_at) {
      return redirect(emailNotVerifiedPath);
    }
  }
}
