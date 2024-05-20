
<script setup>
    import { onMounted, onUnmounted, ref, onBeforeUnmount } from "vue";
    import { useRouter } from 'vue-router';
    import { useLoading } from 'vue-loading-overlay'
    import axios from 'axios';
    // sections
   


    //images
    import vueMkHeader from "@/assets/img/Star.jpg";
    import wavesWhite from "@/assets/img/waves-white.svg";


    //hooks
    const selectedOptions = ref({});
    const apDropdownOptions = ref([]);
    const body = document.getElementsByTagName("body")[0];
    const isLoading = ref(false);
    const fullPage = ref(true)
    const onCancel = ref(false)
    const formContainer = ref(null)
    const $loading = useLoading({
        // options
    })


    onMounted(() => {
        body.classList.add("presentation-page");
        body.classList.add("bg-gray-200");
        window.addEventListener('beforeunload', beforeUnloadEventHandler);

        const savedApButtons = localStorage.getItem('apButtons');
        if (savedApButtons) {
            apButtons.value = JSON.parse(savedApButtons);
        }

        const savedSTAButtons = localStorage.getItem('staButtons');
        if (savedSTAButtons) {
            staButtons.value = JSON.parse(savedSTAButtons);
        }

    });

    onUnmounted(() => {
        body.classList.remove("presentation-page");
        body.classList.remove("bg-gray-200");
    });
    onBeforeUnmount(() => {
        window.removeEventListener('beforeunload', beforeUnloadEventHandler);
    });
    const roamingbutton = ref(false);
    const showApButtons = ref(false);
    const showEnvButtons = ref(false);
    const apButtons = ref(['AP1']);
    const staButtons = ref(['STA1']);
    const router = useRouter();

    function addAp() {
        const newApId = `AP${apButtons.value.length + 1}`;
        apButtons.value.push(newApId);
        localStorage.setItem('apButtons', JSON.stringify(apButtons.value));
    }

    function addSTA() {
        const newSTAId = `STA${staButtons.value.length + 1}`;
        staButtons.value.push(newSTAId);
        localStorage.setItem('staButtons', JSON.stringify(staButtons.value));
    }

    const ClearPage = async () => {
        const loader = $loading.show({
            container: fullPage.value ? null : formContainer.value,
            color: '#02F78E',
            loader: 'bars',
            height: '35%',
            width: '35%',
            canCancel: true,
            onCancel: () => { onCancel.value = true; },
        });

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/clear-page/', {});
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            errorMessage.value = 'Error applying Reset to Default. Please try again later.';
        } finally {
            loader.hide();
        }
    };
    const handleAddAPProfile = async () => {
        const loader = $loading.show({
            container: fullPage.value ? null : formContainer.value,
            color: '#02F78E',
            loader: 'bars',
            height: '35%',
            width: '35%',
            canCancel: true,
            onCancel: () => { onCancel.value = true; },
        });

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/ap-profile/', {});
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            errorMessage.value = 'Error Add AP Profile. Please try again later.';
        } finally {
            loader.hide();
        }
    };
    const handleAddSTAProfile = async () => {
        const loader = $loading.show({
            container: fullPage.value ? null : formContainer.value,
            color: '#02F78E',
            loader: 'bars',
            height: '35%',
            width: '35%',
            canCancel: true,
            onCancel: () => { onCancel.value = true; },
        });

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/sta-profile/', {});
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            errorMessage.value = 'Error Add STA Profile. Please try again later.';
        } finally {
            loader.hide();
        }
    };
    const handleAddWACProfile = async () => {
        const loader = $loading.show({
            container: fullPage.value ? null : formContainer.value,
            color: '#02F78E',
            loader: 'bars',
            height: '35%',
            width: '35%',
            canCancel: true,
            onCancel: () => { onCancel.value = true; },
        });

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/wac-profile/', {});
            console.log(response.data);
        } catch (error) {
            console.error('Error:', error);
            errorMessage.value = 'Error Add WAC Profile. Please try again later.';
        } finally {
            loader.hide();
        }
    };
    const handleClick = async () => {
        await resetApButtons();
        await resetSTAButtons();
        await ClearPage();
        await handleAddAPProfile();
        await handleAddSTAProfile();
        await handleAddWACProfile();
    };
    function navigateToAp(apId) {
        const number = apId.substring(2);
        router.push(`/AP/roaming/${number}`);
    }

    function navigateToSTA(staId) {
        const number = staId.substring(3);
        router.push(`/STA/roaming/${number}`);
    }

    function toggleApButtons() {
        showApButtons.value = !showApButtons.value;
    }

    function toggleEnvButtons() {
        router.push(`/Environment`);    
    }

    function toggleroamingbutton() {
        roamingbutton.value = !showApButtons.value;
    }


    function beforeUnloadEventHandler(event) {
        event.preventDefault();
        event.returnValue = '';
        resetApButtons();
        resetSTAButtons();
    }
    function resetApButtons() {
        apButtons.value = ['AP1'];
        localStorage.removeItem('apButtons');
    }
    function resetSTAButtons() {
        staButtons.value = ['STA1'];
        localStorage.removeItem('staButtons');
    }
</script>

<template>
    <div class="container position-sticky z-index-sticky top-0">

    </div>
    <Header>
        <div class="page-header min-vh-75"
             :style="`background-image: url(${vueMkHeader})`"
             loading="lazy">
            <div class="container">
                <div class="row">
                    <div class="col-lg-7 text-center mx-auto position-relative">
                        <h1 class="pt-3 mt-n5 me-2" :style="{ display: 'inline-block', color: 'white'}">
                            Wi-Fi Fast Regression
                        </h1>
                        <p class="lead text-white px-5 mt-3" :style="{ fontWeight: '500'}">
                            Welcome to Fast Regression! Please perform initial setup.
                        </p>
                    </div>
                </div>
                <div class="col text-center">
                    <button class="btn btn-md mb-4 bg-gradient-info px-5 py-3 mt-4" @click="handleClick">
                        Reset to Default
                    </button>
                </div>
            </div>
        </div>
    </Header>

    <div class="card card-body blur shadow-blur mx-3 mx-md-4 mt-n6">
        <PresentationCounter />
        <PresentationInformation />
        <PresentationExample :data="data" />
        <PresentationPages />
        <BuiltByDevelopers />

        <PresentationTestimonials />

        <div class="container-fluid mt-sm-5 border-radius-xl"
             :style="{
        background: 'linear-gradient(195deg, rgb(66, 66, 74), rgb(25, 25, 25))'
      }">
            <div class="page-header py-6 py-md-5 my-sm-3 mb-3 border-radius-xl"
                 :style="{
          backgroundImage: `url(${wavesWhite})`
        }"
                 loading="lazy">
                <span class="mask bg-gradient-dark"></span>
                <div class="container">
                    <div class="row">
                        <div class="d-flex justify-content-center mb-6">
                            <div class="col-lg-8 ms-lg-5 text-center">
                                <h3 class="text-white mb-3">
                                    Wi-Fi Devices Settings
                                </h3>
                                <div class="mb-5 justify-content-center">
                                    <div class="col text-center">
                                        <button class="btn btn-sm mb-0 bg-gradient-info px-5 py-3 mt-4" @click="toggleEnvButtons">Environment Settings</button>
                                    </div>
                                </div>
                                <div class="row mb-5 justify-content-center">
                                    <div class="col text-center">
                                        <button class="btn btn-sm mb-0 bg-gradient-success px-5 py-3 mt-4" @click="toggleroamingbutton">Turbo Roaming</button>
                                    </div>
                                    <div class="col text-center">
                                        <button class="btn btn-sm mb-0 bg-gradient-success px-5 py-3 mt-4" disabled>Performance</button>
                                    </div>
                                    <div class="col text-center">
                                        <button class="btn btn-sm mb-0 bg-gradient-success px-5 py-3 mt-4" disabled>Iperf Attenuator</button>
                                    </div>
                                </div>
                                <div v-if="roamingbutton" class="row mb-5 justify-content-center">
                                    <div class="col text-center d-flex justify-content-center">
                                        <button class="btn btn-sm mb-0 bg-gradient-success px-4 py-3 mt-4 me-6" @click="toggleApButtons">Client-based Roaming</button>
                                        <button class="btn btn-sm mb-0 bg-gradient-success px-5 py-3 mt-4 me-6" @click="toggleApButtons" disabled>Controller-based Roaming</button>
                                    </div>
                                </div>
                                <div v-if="showApButtons">
                                    <div class="mb-3">
                                        <p class="text-white text-md">
                                            First, set up the Access Point (AP) by clicking the 'AP Button'.
                                            <br /> After that, proceed to configure the Client (STA) settings.
                                        </p>
                                        <!-- AP Buttons -->
                                        <button v-for="(ap, index) in apButtons" :key="ap" @click="navigateToAp(ap)" style="margin: 2%" class="btn btn-sm mb-0 bg-gradient-success px-3 py-2">
                                            {{ ap }}
                                        </button>
                                        <button style="margin: 2%" class="btn btn-sm mb-0 bg-gradient-success px-3 py-2" @click="addAp();handleAddAPProfile()">+</button>
                                    </div>

                                    <!-- STA Buttons -->
                                    <button v-for="(sta, index) in staButtons" :key="sta" @click="navigateToSTA(sta)" style="margin: 2%" class="btn btn-sm mb-0 bg-gradient-success px-3 py-2">
                                        {{ sta }}
                                    </button>
                                    <button style="margin: 2%" class="btn btn-sm mb-0 bg-gradient-success px-3 py-2" @click="addSTA(); handleAddSTAProfile()">+</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="py-4 blur shadow-blur">

        </div>
    </div>
    <DefaultFooter />
</template>


