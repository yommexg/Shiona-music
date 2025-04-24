import { Text, View } from "react-native";
import { PropsWithChildren } from "react";
import {
  Menu,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from "react-native-popup-menu";
import { useAuthStore } from "@/store/useAuthStore";

type MusicOptionsProps = PropsWithChildren<{}>;

export const MusicOptions = ({ children }: MusicOptionsProps) => {
  const { logout } = useAuthStore();

  const handlePressAction = async (id: string) => {
    switch (id) {
      // For Students
      case "":
        // router.push(
        //   `/(student)/(courses)/studentCourse/(studentDetails)/${courseId}&&&Enrolled Courses`
        // );
        break;

      case "logout":
        logout();

      default:
        console.warn(`Unknown menu action ${id}`);
        break;
    }
  };

  return (
    <Menu>
      <MenuTrigger
        customStyles={{
          triggerWrapper: {
            padding: 2,
          },
        }}>
        {children}
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            padding: 10,
            borderRadius: 8,
            backgroundColor: "#1E1E1E",
          },
        }}>
        <View style={{ gap: 20 }}>
          {/* <MenuOption onSelect={() => handlePressAction("home")}>
            <Text className="text-white">1</Text>
          </MenuOption>
          <MenuOption onSelect={() => handlePressAction("annoucement")}>
            <Text>2</Text>
          </MenuOption> */}
          <MenuOption onSelect={() => handlePressAction("logout")}>
            <Text
              style={{
                fontSize: 18,
                color: "white",
                textAlign: "center",
                backgroundColor: "red",
                paddingVertical: 5,
                borderRadius: 4,
              }}>
              Logout
            </Text>
          </MenuOption>
        </View>
      </MenuOptions>
    </Menu>
  );
};
