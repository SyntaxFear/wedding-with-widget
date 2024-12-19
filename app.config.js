export default {
  expo: {
    name: "wedding-planner",
    slug: "wedding-planner",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "myapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.parastashvilii.weddingplanner",
      infoPlist: {
        NSPhotoLibraryUsageDescription: "Allow access to photo library to customize your widget with your own images",
        NSCameraUsageDescription: "Allow camera access to take photos for your widget"
      },
      xcode: {
        appExtAPI: true,
        configOverrides: {
          SWIFT_VERSION: "5.4",
          SWIFT_COMPILATION_MODE: "wholemodule",
          SWIFT_OPTIMIZATION_LEVEL: "-O",
          SWIFT_TREAT_WARNINGS_AS_ERRORS: "NO",
        },
        entitlements: {
          "com.apple.security.application-groups": [
            "group.com.parastashvilii.weddingplanner",
          ],
        },
      },
    },
    android: {
      package: "com.parastashvilii.weddingplanner",
      adaptiveIcon: {
        foregroundImage: "./assets/images/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      permissions: [
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE",
        "MEDIA_LIBRARY"
      ]
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-splash-screen",
      [
        "expo-image-picker",
        {
          photosPermission: "Allow access to photos to customize your widget with your own images",
          cameraPermission: "Allow camera access to take photos for your widget"
        }
      ],
      [
        "@bittingz/expo-widgets",
        {
          ios: {
            src: "./app/widgets/ios",
            mode: "development",
            moduleDependencies: ["MyData.swift", "LogHandler.swift"],
            devTeamId: "CNH4KYRW44",
            moduleDependencies: [],
            useLiveActivities: false,
            frequentUpdates: false,
            entitlements: {
              "com.apple.security.application-groups": [
                "group.com.parastashvilii.weddingplanner",
              ],
            },
          },
          android: {
            src: "./app/widgets/android",
            widgets: [
              {
                name: "SampleWidget",
                resourceName: "@xml/sample_widget_info",
              },
            ],
          },
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {
        origin: false,
      },
      eas: {
        projectId: "3772958a-5827-468f-b443-c94c858bb479",
      },
    },
  },
};
