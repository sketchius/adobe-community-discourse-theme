import { withPluginApi } from "discourse/lib/plugin-api";
import icon from "discourse-common/helpers/d-icon";

function buildIcon(iconNameOrImageUrl, title) {
    return <template>{{icon iconNameOrImageUrl label=title}}</template>;
}

export default {
  name: "custom-header-icons",
  initialize() {
    withPluginApi("1.8.0", (api) => {
      try {
          const messageIconTemplate = buildIcon('envelope', 'Messages');
          const notificationIconTemplate = buildIcon('bell', 'Notifications');
          const username = api.getCurrentUser().username;
          const messagesLink = `u/${username}/messages`;
          const notificationsLink = `u/${username}/notifications`;
          const messagesIcon = <template>
            <li
              class="messages-icon"
            >
              <a
                class="icon btn-flat"
                href={{messagesLink}}
                title="Messages"
              >
                {{messageIconTemplate}}
              </a>
            </li>
          </template>;
          const notificationsIcon = <template>
            <li
              class="messages-icon"
            >
              <a
                class="icon btn-flat"
                href={{notificationsLink}}
                title="Notifications"
              >
                {{notificationIconTemplate}}
              </a>
            </li>
          </template>;

          const beforeIcon = ["chat", "search", "hamburger", "user-menu"];

          api.headerIcons.add('Messages', messagesIcon, { before: beforeIcon });
          api.headerIcons.add('Notifications', notificationsIcon, { before: beforeIcon });

      } catch (error) {

      }
    });
  },
};