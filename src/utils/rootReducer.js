import { combineReducers } from "redux";
import SignUpReducer from "../pages/signUp/state/SignUpSlice";
// import { LoginReducer } from "../pages/client/login/state/LoginReducer";
// import { sidebarReducer } from "../common/components/sidebars/state/sidebarReducer";

// // Shared reducers
// import { HelpReducer } from "../pages/shared/help/state/HelpReducer";
// import { DonateReducer } from "../pages/shared/donate/state/DonateReducer";

// // client reducers
// import SignUpReducer from "../pages/client/signUp/state/SignUpReducer";
// import { filteredCounselorsReducer } from "../pages/client/filteredCounselors/state/filteredCounselorsReducer";
// import { schedulesReducer } from "../common/components/schedules/state/schedulesReducer";
// import { mySessionReducer } from "../pages/client/sessionRoomClient/state/mySessionReducer";
// import { HomeReducer } from "../pages/client/home/state/HomeReducer";
// import { FindCounselorStepperReducer } from "../pages/client/findCounselorSteppers/state/FindCounselorStepperReducer";
// import { findCounselorReducer } from "../pages/client/findCounselor/state/findCounselorReducer";
// import { InitialLoginSteppersReducer } from "../pages/client/InitialLoginSteppers/state/InitialLoginSteppersReducer";
// import { ClientSettingsReducer } from "../pages/client/clientSettings/state/ClientSettingsReducer";
// import { CounselorReviewsReducer } from "../pages/client/counselorReviews/state/CounselorReviewsReducer";
// import ConnectReducer from "../pages/client/connect/state/ConnectSlice";

// // counselor reducer
// import { counselorProfileReducer } from "../pages/counselors/counselorProfile/state/counselorProfileReducer";
// import { counselorProfileViewIndexReducer } from "../pages/counselors/counselorProfileViewIndex/state/counselorProfileViewIndexReducer";
// import { navbarReducer } from "../common/components/navbarCounselor/state/NavbarCounselorReducer";
// import { counsellingRequestFormReducer } from "../pages/counselors/counsellingRequestForm/state/counsellingRequestFormReducer";
// import { CounselorLoginReducer } from "../pages/counselors/counselorLogin/state/counselorLoginReducer";
// import { counselorHomeReducer } from "../pages/counselors/counselorHome/state/counselorHomeReducer";
// import { getCounselorAppointmentRequestsReducer } from "../common/components/counselorRightBar/state/CounselorRightBarReducer";
// import { getNotificationsReducer } from "../common/components/notifications/state/NotificationsReducer";
// import { mySessionCounselorReducer } from "../pages/counselors/mySessionsCounselor/state/mySessionCounselorReducer";
// import { counselorCompleteFormReducer } from "../pages/counselors/counselorCompleteForm/state/counselorCompleteFormReducer";
// import { CommonReducer } from "../common/state/CommonReducer";
// import { counselorRequestsReducer } from "../pages/counselors/counselorRequests/state/CounselorRequestsReducer";
// import { counselorScheduleReducer } from "../pages/counselors/counselorSchedule/state/counselorScheduleReducer";
// import { counselorOrderReducer } from "../pages/counselors/counselorOrder/state/CounselorOrderReducer";
// import { counselorWalletReducer } from "../pages/counselors/counselorWallet/state/CounselorWalletReducer";
// // import { CounselorConnectReducer } from "../pages/counselors/counselorConnect/state/OrganizationClientSlice";
// import CounselorConnectReducer from "../pages/counselors/counselorConnect/state/CounselorConnectSlice";

// // admin reducers
// import { counsellingApplicationFormReducer } from "../pages/admin/counsellingApplicationListV3/state/counsellingApplicationFormReducer";
// import { counsellingApplicationViewReducer } from "../pages/admin/counsellingRequestView/state/counsellingApplicationViewReducer";
// import { AdminLoginReducer } from "../pages/admin/adminLogin/state/AdminLoginReducer";
// import { getCounsellingApplicationRequestsReducer } from "../pages/admin/counsellingApplicationList/state/getCounsellingApplicationRequestsReducer";
// import { ClientAppointmentReducer } from "../pages/client/clientAppointments/state/ClientAppointmentReducer";
// import { ModalReducer } from "../common/components/modals/state/ModalReducer";
// import { BookingPaymentReducer } from "../pages/client/BookingPayment/state/BookingPaymentReducer";
// import { SessionRoomCounselorReducer } from "../pages/counselors/sessionRoomCounselor/state/SessionRoomCounselorReducer";
// import { RoomReducer } from "../common/components/Room/state/RoomReducer";
// import { VerifiedCounselorsReducer } from "../pages/admin/VerifiedCounselors/state/VerifiedCounselorsReducer";
// import { AllAppointmentsReducer } from "../pages/admin/allAppointments/state/AllAppointmentsReducer";
// import { AllClientsReducer } from "../pages/admin/allClients/state/AllClientsReducer";
// import { AllInstantHelpReducer } from "../pages/admin/allInstantHelp/state/AllInstantHelpReducer";
// import { AppointmentsWithComplainReducer } from "../pages/admin/appointmentsWithComplain/state/AppointmentsWithComplainReducer";
// import { OrganizationAdminReducer } from "../pages/admin/organizationsAdmin/state/OrganizationAdminReducer";
// import OrganizationClientReducer from "../pages/admin/organizationClients/state/OrganizationClientSlice";

// // organization reducers
// import { OrganizationLoginReducer } from "../pages/organization/organizationLogin/state/OrganizationLoginReducer";
// import { OrganizationHomeReducer } from "../pages/organization/organizationHome/state/OrganizationHomeReducer";
// import { OrganizationEmployeesReducer } from "../pages/organization/organizationEmployees/state/OrganizationEmployeesReducer";
// import { OrganizationTransactionsReducer } from "../pages/organization/organizationTransactions/state/OrganizationTransactionsReducer";
// import { OrganizationAppointmentsReducer } from "../pages/organization/organizationAppointments/state/OrganizationAppointmentsReducer";
// import { OrganizationEmployeeDetailsReducer } from "../pages/organization/organizationEmployeeDetails/state/OrganizationEmployeeDetailsReducer";
// import { CounselorUnderReviewReducer } from "../pages/admin/counselorUnderReview/state/CounselorUnderReviewReducer";
// import { CounselorDetailsReducer } from "../pages/admin/counselorDetails/state/CounselorDetailsReducer";
// import { CounselorAccountSetupReducer } from "../pages/counselors/CounselorAccountSetup/state/CounselorAccountSetupFormReducer";
// import { OrganizationSignUpReducer } from "../pages/organization/organizationSignup/state/OrganizationSignupReducer";
// import { organizationPaymentPlanReducer } from "../pages/organization/organizationPaymentPlan/state/organizationPaymentPlanReducer";
// import { organizationPaymentReducer } from "../pages/organization/organizationPayment/state/organizationPaymentReducer";

// // Mediasoup video
// import room from "../common/mediasoupVideo/redux/reducers/room";
// import me from "../common/mediasoupVideo/redux/reducers/me";
// import producers from "../common/mediasoupVideo/redux/reducers/producers";
// import dataProducers from "../common/mediasoupVideo/redux/reducers/dataProducers";
// import peers from "../common/mediasoupVideo/redux/reducers/peers";
// import consumers from "../common/mediasoupVideo/redux/reducers/consumers";
// import dataConsumers from "../common/mediasoupVideo/redux/reducers/dataConsumers";
// import notifications from "../common/mediasoupVideo/redux/reducers/notifications";

const rootReducer = combineReducers({
    SignUpReducer
});

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//         getDefaultMiddleware({
//             serializableCheck: false,
//         }),
// });

// export const persistor = persistStore(store);

export default rootReducer;
