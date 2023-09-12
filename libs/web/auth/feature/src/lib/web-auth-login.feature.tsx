import { Button, Group, Title } from '@mantine/core'
import { LoginInput } from '@pubkey-bot/sdk'
import { useWebAuth } from '@pubkey-bot/web/auth/data-access'
import { AuthUiLoginForm, AuthUiPage } from '@pubkey-bot/web/auth/ui'
import { UiLoader, UiStack } from '@pubkey-bot/web/ui/core'
import { WebUserUiAvatar } from '@pubkey-bot/web/user/ui'
import { IconBrandDiscord } from '@tabler/icons-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

export default function WebAuthLoginFeature() {
  const { login, user, appConfig, appConfigLoading } = useWebAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const redirect = location.state?.from?.pathname || '/dashboard'
  async function loginHandler(input: LoginInput) {
    setLoading(true)

    return login(input).then((res) => {
      if (res) {
        navigate(redirect)
      }
      setLoading(false)
      return !!res
    })
  }

  if (appConfigLoading || !appConfig) {
    return <UiLoader />
  }

  const { authDiscordEnabled, authPasswordEnabled, authRegisterEnabled } = appConfig

  const noAuthEnabled = !authDiscordEnabled && !authRegisterEnabled && !authPasswordEnabled

  return (
    <AuthUiPage>
      {noAuthEnabled ? (
        <Group position="center">
          <Title>Login is disabled</Title>
        </Group>
      ) : (
        <UiStack>
          {user && (
            <Button
              radius="md"
              size="xl"
              disabled={loading}
              fullWidth
              onClick={() => navigate(redirect)}
              leftIcon={<WebUserUiAvatar user={user} size={28} />}
            >
              Continue as {user.username}
            </Button>
          )}
          {authDiscordEnabled ? (
            <Button
              radius="md"
              size="xl"
              component="a"
              href="/api/auth/discord"
              variant="light"
              leftIcon={<IconBrandDiscord size={28} />}
            >
              Sign in with Discord
            </Button>
          ) : null}
          {authPasswordEnabled ? (
            <AuthUiLoginForm submit={loginHandler}>
              <Group position="apart">
                <Button loading={loading} type="submit">
                  Login
                </Button>
                {authRegisterEnabled ? (
                  <Button disabled={loading} component={Link} to="/register" variant="default">
                    Register
                  </Button>
                ) : null}
              </Group>
            </AuthUiLoginForm>
          ) : null}
        </UiStack>
      )}
    </AuthUiPage>
  )
}
