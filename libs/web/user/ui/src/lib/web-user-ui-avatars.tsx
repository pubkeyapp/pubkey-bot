import { User } from '@pubkey-bot/sdk'
import { Avatar, Tooltip } from '@mantine/core'

export function WebUserUiAvatars({ users = [] }: { users?: User[] }) {
  const count = users.length
  const max = 3
  const overflow = count - max
  const visible = users.slice(0, max)
  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {visible.map((user) => (
          <Tooltip key={user.id} label={user?.username} withArrow>
            <Avatar src={user?.avatarUrl} radius={100} />
          </Tooltip>
        ))}
        {overflow > 0 ? (
          <Tooltip
            withArrow
            label={
              <>
                {users.slice(max).map((user) => (
                  <div key={user.id}>{user?.username}</div>
                ))}
              </>
            }
          >
            <Avatar radius={100}>+{overflow}</Avatar>
          </Tooltip>
        ) : null}
      </Avatar.Group>
    </Tooltip.Group>
  )
}
