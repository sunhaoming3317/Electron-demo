import { lazy } from "react";
import { RouteObject } from "react-router-dom";

const Layout = lazy(() => import("@/pages/layout"));

const Dialog = lazy(() => import("@/pages/dialog"));

const ShowOpenDialog = lazy(() => import("@/pages/dialog/show-open-dialog"));

const ShowSaveDialog = lazy(() => import("@/pages/dialog/show-save-dialog"));

const ShowMessageBox = lazy(() => import("@/pages/dialog/show-message-box"));

const ShowErrorBox = lazy(() => import("@/pages/dialog/show-error-box"));

const ShowCertificateTrustDialog = lazy(() => import("@/pages/dialog/show-certificate-trust-dialog"));

const Notification = lazy(() => import("@/pages/notification"));

const NotificationWebApi = lazy(() => import("@/pages/notification/web-api"));

const Clipboard = lazy(() => import("@/pages/clipboard"));

const ClipboardDemo = lazy(() => import("@/pages/clipboard/demo"));

const DeviceAccess = lazy(() => import("@/pages/device-access"));

const DeviceAccessDemo = lazy(() => import("@/pages/device-access/demo"));

const SessionDemo = lazy(() => import("@/pages/session"));

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/dialog", element: <Dialog /> },
      { path: "/dialog/1", element: <ShowOpenDialog /> },
      { path: "/dialog/2", element: <ShowSaveDialog /> },
      { path: "/dialog/3", element: <ShowMessageBox /> },
      { path: "/dialog/4", element: <ShowErrorBox /> },
      { path: "/dialog/5", element: <ShowCertificateTrustDialog /> },
      { path: "/notification", element: <Notification /> },
      { path: "/notification/web-api", element: <NotificationWebApi /> },
      { path: "/clipboard", element: <Clipboard /> },
      { path: "/clipboard/demo", element: <ClipboardDemo /> },
      { path: "/device-access", element: <DeviceAccess /> },
      { path: "/device-access/demo", element: <DeviceAccessDemo /> },
      { path: "/session", element: <SessionDemo />}
    ],
  },
];

export default routes;
