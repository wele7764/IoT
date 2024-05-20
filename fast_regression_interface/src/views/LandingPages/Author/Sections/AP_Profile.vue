<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRoute, useRouter } from 'vue-router';
import { useLoading } from 'vue-loading-overlay'
import axios from 'axios'; // import backend parameters


import MaterialAvatar from "@/components/MaterialAvatar.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import setNavPills from "@/assets/js/nav-pills";
import MaterialAlert from "@/components/MaterialAlert.vue";
import TabsSimple from "@/layouts/sections/navigation/nav-tabs/components/TabsSimple.vue";
import 'bootstrap/dist/js/bootstrap.bundle.min';


// image
import profilePic from "@/assets/img/fast_bird_profile.png";


import setMaterialInput from "@/assets/js/material-input";
onMounted(() => {
  setMaterialInput();
  setNavPills();
});

const errorMessage = ref('');
const route = useRoute();
const router = useRouter();
const apButtons = ref([]);
const apId = route.params.id;
const rfType_dict = ref({});

const dutModelList = ref([]);
const dutCountryList = ref([]);
const dutChannelList = ref([]);
const dutChannelBandList = ref([]);
const dutSecurityList = ref([]);
const dutSecurityModeList = ref([]);
const dut80211wList = ref([]);
const dutEncryptionList = ref([]);
const dutAntennaList = ref([]);
//const dutBcastrateList = ref([]);
//const dutDatarateList = ref([]);
//const dutMgmtrateList = ref([]);

const selectedModel = ref("");
const selectedCOM  = ref("");
const selectedRfBand = ref([]);
const selectedModes = ref([]);
const selectedCountries = ref([]);
const selectedChannel_24Gand5G = ref([]);
const selectedChannel_24G = ref([]);
const selectedChannel_5G = ref([]);
//const selectedDatarate = ref("");
//const selectedBcastrate = ref("");
//const selectedMgmtrate = ref("");
const selectedBandwidth_24Gand5G = ref([]);
const selectedSecurity_24Gand5G = ref([]);
const selectedEncryption_24Gand5G = ref([]);
const selectedSecurityMode_24Gand5G = ref([]);
const selected80211_24Gand5G = ref([]);
const selectedRfType_24Gand5G = ref([]);
const selectedAntenna_24Gand5G = ref([]);

const isAppliedModel = ref(false);
const isAppliedCOM = ref(false);
const isAppliedCountry = ref(false);
const isAppliedMode = ref(false);
const isAppliedRFband = ref(false);
const isAppliedRFtype_24Gand5G = ref(false);
const isAppliedChBand_24Gand5G = ref(false);
const isAppliedChannel_24Gand5G = ref(false);
const isAppliedSecMode_24Gand5G = ref(false);
const isApplied80211w_24Gand5G = ref(false);
const isAppliedSecurity_24Gand5G = ref(false);
const isAppliedEncryption_24Gand5G = ref(false);
const isAppliedAntenna_24Gand5G = ref(false);


const selectedBandwidth_24G = ref([]);
const selectedSecurity_24G = ref([]);
const selectedEncryption_24G = ref([]);
const selectedSecurityMode_24G = ref([]);
const selected80211_24G = ref([]);
const selectedRfType_24G = ref([]);
const selectedAntenna_24G = ref([]);
const isAppliedChannel_24G = ref(false);
const isAppliedChannel_5G = ref(false);

const isAppliedRFtype_24G = ref(false);
const isAppliedChBand_24G = ref(false);
const isAppliedSecMode_24G = ref(false);
const isApplied80211w_24G = ref(false);
const isAppliedSecurity_24G = ref(false);
const isAppliedEncryption_24G = ref(false);
const isAppliedAntenna_24G = ref(false);

const selectedBandwidth_5G = ref([]);
const selectedSecurity_5G = ref([]);
const selectedEncryption_5G = ref([]);
const selectedSecurityMode_5G = ref([]);
const selected80211_5G = ref([]);
const selectedRfType_5G = ref([]);
const selectedAntenna_5G = ref([]);

const isAppliedRFtype_5G = ref(false);
const isAppliedChBand_5G = ref(false);
const isAppliedSecMode_5G = ref(false);
const isApplied80211w_5G = ref(false);
const isAppliedSecurity_5G = ref(false);
const isAppliedEncryption_5G = ref(false);
const isAppliedAntenna_5G = ref(false);





const fullPage = ref(true)
const onCancel = ref(false)
const formContainer = ref(null)

const $loading = useLoading({
  // options
})

onMounted(async () => {
  // Retrieve the button states from local storage
  const savedApButtons = localStorage.getItem('apButtons');
  if (savedApButtons) {
    apButtons.value = JSON.parse(savedApButtons);
  }

  // Redirect to the homepage if the current AP ID is not listed
  const apId = route.params.id;
  if (apId !== '1' && !apButtons.value.includes(`AP${apId}`)) {
    router.push('/'); // Redirect if the AP ID is not in the list
  }

  const loader = $loading.show({
    container: fullPage.value ? null : formContainer.value,
    color: 'grey',
    height: '35%',
    width: '35%',
    canCancel: false,
  });

  
  // Attempt to fetch model list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/model-list');
    dutModelList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch model list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Model list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }
  
  // Attempt to fetch country list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/country-list');
    dutCountryList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch country list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Countrylist)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }

  // Attempt to fetch channel bandwidth list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/ch-bandwidth-list/');
    dutChannelBandList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch channel bandwidth list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Channel bandwidth list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }

  // Attempt to fetch 802.11w list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/80211w/');
    dut80211wList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch 80211w list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Channel bandwidth list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }
  
  // Attempt to fetch security list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/security-list');
    dutSecurityList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch security list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Security list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }
  
  // Attempt to fetch security list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/securitymode-list');
    dutSecurityModeList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch security mode list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Security Mode list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }  
  // Attempt to fetch encryption list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/encryption-list');
    dutEncryptionList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch encryption list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Encryption list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }
  
  // Attempt to fetch antenna list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/antenna-list');
    dutAntennaList.value = response.data;
  } catch (error) {
    console.error('Failed to fetch antenna list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Antenna list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }
  
  // Attempt to fetch channel list
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/channel-list');
    dutChannelList.value = response.data;
	loader.hide(); // Hide loading overlay after fetching
  } catch (error) {
    console.error('Failed to fetch channel list:', error);
	errorMessage.value = 'Error loading data. Please try again later. (Channel list)';
    loader.hide(); // Ensure loading overlay is hidden even if there's an error
  }    
  // Attempt to fetch data rate list (Do NOT Developed)
  //try {
  //  const response = await axios.get('http://127.0.0.1:8000/api/datarate-list');
  //  dutDatarateList.value = response.data;
  //  loader.hide(); // Hide loading overlay after fetching
  //} catch (error) {
  //  console.error('Failed to fetch data rate list:', error);
	//errorMessage.value = 'Error loading data. Please try again later. (Data rate list)';
  //  loader.hide(); // Ensure loading overlay is hidden even if there's an error
  //} 

  // Attempt to fetch management rate list (Do NOT Developed)
  //try {
  //  const response = await axios.get('http://127.0.0.1:8000/api/mgmtrate-list');
  //  dutMgmtrateList.value = response.data;
  //  loader.hide(); // Hide loading overlay after fetching
  //} catch (error) {
  //  console.error('Failed to fetch management rate list:', error);
	//errorMessage.value = 'Error loading data. Please try again later. (Management rate list)';
  //  loader.hide(); // Ensure loading overlay is hidden even if there's an error
  //}  

  // Attempt to fetch broadcastm/multicast rate list (Do NOT Developed)
  //try {
  //  const response = await axios.get('http://127.0.0.1:8000/api/bcast-list');
  //  dutBcastrateList.value = response.data;
  //  loader.hide(); // Hide loading overlay after fetching
  //} catch (error) {
  //  console.error('Failed to fetch broadcastm/multicast rate list:', error);
	//errorMessage.value = 'Error loading data. Please try again later. (bcast/multicast rate list)';
  //  loader.hide(); // Ensure loading overlay is hidden even if there's an error
  //}    
});


const handleRFbandClick = async () => {
  // Display the loading indicator
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
    const response = await axios.post('http://127.0.0.1:8000/api/rf-list/', {
      rfTypes: selectedRfBand.value,  // Modify to rfTypes
    });

    // Print response.data to the console
    //console.log('Response data:', response.data);
    rfType_dict.value = response.data;
    // Hide the loading indicator
    loader.hide();
  } catch (error) {
    // Display error message when the request fails
    errorMessage.value = 'Error loading data. Please try again later. (RF list)';
    isAppliedRFband.value = false;
    // Hide the loading indicator when the request fails
    loader.hide();
  }
};

const handleModelApply = async () => {
  isAppliedModel.value = true;
  const loader = $loading.show({
    container: fullPage.value ? null : formContainer.value,
    color: 'grey',
	loader: 'bars',
    height: '35%',
    width: '35%',
    canCancel: true,
    onCancel: () => { onCancel.value = true; },
  });

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/apply-model/', { model: selectedModel.value, apid: apId });
    console.log(response.data);
    isAppliedModel.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying model. Please try again later.';
	isAppliedModel.value = false;
  } finally {
    loader.hide();
  }
};

const handleCOMApply = async () => {
  isAppliedCOM.value = true;
  const loader = $loading.show({
    container: fullPage.value ? null : formContainer.value,
    color: 'grey',
	loader: 'bars',
    height: '35%',
    width: '35%',
    canCancel: true,
    onCancel: () => { onCancel.value = true; },
  });

  try {
    const response = await axios.post('http://127.0.0.1:8000/api/apply-COM/', { COM: selectedCOM.value, apid: apId });
    console.log(response.data);
    isAppliedCOM.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying model. Please try again later.';
	isAppliedCOM.value = false;
  } finally {
    loader.hide();
  }
};

const handleCountryApply = async () => {
  isAppliedCountry.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-country/', { country: selectedCountries.value, apid: apId });
    console.log(response.data);
    isAppliedCountry.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying country. Please try again later.';
	isAppliedCountry.value = false;
  } finally {
    loader.hide();
  }
};

const handleModeApply = async () => {
  isAppliedMode.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-mode/', { mode: selectedModes.value, apid: apId });
    console.log(response.data);
    isAppliedMode.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying mode. Please try again later.';
	isAppliedMode.value = false;
  } finally {
    loader.hide();
  }
};

// 2.4GHz & 5GHz 
const handleRFtypeApply_24Gand5G = async () => {
  isAppliedRFtype_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-rftype_24Gand5G/', { rftype: selectedRfType_24Gand5G.value, apid: apId });
    console.log(response.data);
    handleRFtypeApply_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying country. Please try again later.';
	isAppliedRFtype_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleChannel_24Gand5G = async () => {
  isAppliedChannel_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-channel_24Gand5G/', { channel: selectedChannel_24Gand5G.value, apid: apId });
    console.log(response.data);
    isAppliedChannel_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Channel. Please try again later.';
	isAppliedChannel_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleChBandwidth_24Gand5G = async () => {
  isAppliedChBand_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-ch_bandwidth_24Gand5G/', { bandwidth: selectedBandwidth_24Gand5G.value, apid: apId });
    console.log(response.data);
    isAppliedChBand_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Channel Bandwidth. Please try again later.';
	isAppliedChBand_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleSecurityMode_24Gand5G = async () => {
  isAppliedSecMode_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-securitymode_24Gand5G/', { SecurityMode: selectedSecurityMode_24Gand5G.value, apid: apId });
    console.log(response.data);
    isAppliedSecMode_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Securit Mode. Please try again later.';
	isAppliedSecMode_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};

const handle80211w_24Gand5G = async () => {
  isApplied80211w_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-pmf_24Gand5G/', { PMF: selected80211_24Gand5G.value, apid: apId });
    console.log(response.data);
    isApplied80211w_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying 80211w. Please try again later.';
	isApplied80211w_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleSecurity_24Gand5G = async () => {
  isAppliedSecurity_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-security_24Gand5G/', { security: selectedSecurity_24Gand5G.value, apid: apId });
    console.log(response.data);
    isAppliedSecurity_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying 80211w. Please try again later.';
	isAppliedSecurity_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleEncryption_24Gand5G = async () => {
  isAppliedEncryption_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-encryption_24Gand5G/', { encryption: selectedEncryption_24Gand5G.value, apid: apId });
    console.log(response.data);
    isAppliedEncryption_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Encryption. Please try again later.';
	isAppliedEncryption_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleAntenna_24Gand5G = async () => {
  isAppliedAntenna_24Gand5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-antenna_24Gand5G/', { antenna: selectedAntenna_24Gand5G.value, apid: apId });
    console.log(response.data);
    isAppliedAntenna_24Gand5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Encryption. Please try again later.';
	isAppliedAntenna_24Gand5G.value = false;
  } finally {
    loader.hide();
  }
};
// 2.4GHz
const handleRFtypeApply_24G = async () => {
  isAppliedRFtype_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-rftype_24G/', { rftype: selectedRfType_24G.value, apid: apId });
    console.log(response.data);
    handleRFtypeApply_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying country. Please try again later.';
	isAppliedRFtype_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handleChannel_24G = async () => {
  isAppliedChannel_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-channel_24G/', { channel: selectedChannel_24G.value, apid: apId });
    console.log(response.data);
    isAppliedChannel_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Channel. Please try again later.';
	isAppliedChannel_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handleChBandwidth_24G = async () => {
  isAppliedChBand_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-ch_bandwidth_24G/', { bandwidth: selectedBandwidth_24G.value, apid: apId });
    console.log(response.data);
    isAppliedChBand_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Channel Bandwidth. Please try again later.';
	isAppliedChBand_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handleSecurityMode_24G = async () => {
  isAppliedSecMode_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-securitymode_24G/', { SecurityMode: selectedSecurityMode_24G.value, apid: apId });
    console.log(response.data);
    isAppliedSecMode_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Securit Mode. Please try again later.';
	isAppliedSecMode_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handle80211w_24G = async () => {
  isApplied80211w_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-pmf_24G/', { PMF: selected80211_24G.value, apid: apId });
    console.log(response.data);
    isApplied80211w_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying 80211w. Please try again later.';
	isApplied80211w_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handleSecurity_24G = async () => {
  isAppliedSecurity_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-security_24G/', { security: selectedSecurity_24G.value, apid: apId });
    console.log(response.data);
    isAppliedSecurity_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying 80211w. Please try again later.';
	isAppliedSecurity_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handleEncryption_24G = async () => {
  isAppliedEncryption_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-encryption_24G/', { encryption: selectedEncryption_24G.value, apid: apId });
    console.log(response.data);
    isAppliedEncryption_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Encryption. Please try again later.';
	isAppliedEncryption_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handleAntenna_24G = async () => {
  isAppliedAntenna_24G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-antenna_24G/', { antenna: selectedAntenna_24G.value, apid: apId });
    console.log(response.data);
    isAppliedAntenna_24G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Encryption. Please try again later.';
	isAppliedAntenna_24G.value = false;
  } finally {
    loader.hide();
  }
};

const handleRFtypeApply_5G = async () => {
  isAppliedRFtype_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-rftype_5G/', { rftype: selectedRfType_5G.value, apid: apId });
    console.log(response.data);
    handleRFtypeApply_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying country. Please try again later.';
	isAppliedRFtype_5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleChannel_5G = async () => {
  isAppliedChannel_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-channel_5G/', { channel: selectedChannel_5G.value, apid: apId });
    console.log(response.data);
    isAppliedChannel_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Channel. Please try again later.';
	isAppliedChannel_5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleChBandwidth_5G = async () => {
  isAppliedChBand_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-ch_bandwidth_5G/', { bandwidth: selectedBandwidth_5G.value, apid: apId });
    console.log(response.data);
    isAppliedChBand_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Channel Bandwidth. Please try again later.';
	isAppliedChBand_5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleSecurityMode_5G = async () => {
  isAppliedSecMode_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-securitymode_5G/', { SecurityMode: selectedSecurityMode_5G.value, apid: apId });
    console.log(response.data);
    isAppliedSecMode_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Securit Mode. Please try again later.';
	isAppliedSecMode_5G.value = false;
  } finally {
    loader.hide();
  }
};

const handle80211w_5G = async () => {
  isApplied80211w_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-pmf_5G/', { PMF: selected80211_5G.value, apid: apId });
    console.log(response.data);
    isApplied80211w_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying 80211w. Please try again later.';
	isApplied80211w_5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleSecurity_5G = async () => {
  isAppliedSecurity_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-security_5G/', { security: selectedSecurity_5G.value, apid: apId });
    console.log(response.data);
    isAppliedSecurity_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying 80211w. Please try again later.';
	isAppliedSecurity_5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleEncryption_5G = async () => {
  isAppliedEncryption_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-encryption_5G/', { encryption: selectedEncryption_5G.value, apid: apId });
    console.log(response.data);
    isAppliedEncryption_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Encryption. Please try again later.';
	isAppliedEncryption_5G.value = false;
  } finally {
    loader.hide();
  }
};

const handleAntenna_5G = async () => {
  isAppliedAntenna_5G.value = true;
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
    const response = await axios.post('http://127.0.0.1:8000/api/apply-antenna_5G/', { antenna: selectedAntenna_5G.value, apid: apId });
    console.log(response.data);
    isAppliedAntenna_5G.value = true;
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = 'Error applying Encryption. Please try again later.';
	isAppliedAntenna_5G.value = false;
  } finally {
    loader.hide();
  }
};



const chunkedCountries = computed(() => {
  const result = [];
  const chunkSize = 5;
  for (let i = 0; i < dutCountryList.value.length; i += chunkSize) {
    result.push(dutCountryList.value.slice(i, i + chunkSize));
  }
  return result;
});

const chunkedSecurityList = computed(() => {
  const result = [];
  const chunkSize = 3;
  for (let i = 0; i < dutSecurityList.value.length; i += chunkSize) {
    result.push(dutSecurityList.value.slice(i, i + chunkSize));
  }
  return result;
});

const filtered24GChannelList = computed(() => {
  return dutChannelList.value.filter(channel => {
    const numericValue = parseInt(channel);
    return numericValue < 15;
  });
});

const filtered5GChannelList = computed(() => {
  return dutChannelList.value.filter(channel => {
    const numericValue = parseInt(channel);
    return numericValue > 35;
  });
});

const filteredRfTypes = computed(() => {
  const rfTypesSet = new Set(rfType_dict.value['2.4&5GHz']);
  return Array.from(rfTypesSet);
});

function goHome() {
  router.push('/');
};

</script>


<template>
	<section class="py-sm-7 py-5 position-relative">
		<div class="container">
		  <div class="row">
			<div class="col-12 mx-auto">
			  <div class="mt-n8 mt-md-n9 text-center">
				<div class="blur-shadow-avatar">
				  <MaterialAvatar
					size="xxl"
					class="shadow-xl position-relative z-index-2"
					:image="profilePic"
					alt="Avatar"
				  />
				</div>
			  </div>
			  <div class="row py-7">
			  
				<div
				  class="col-lg-7 col-md-7 z-index-2 position-relative px-md-2 px-sm-5 mx-auto"
				>
				<div v-show="errorMessage" class="error-message">
					<MaterialAlert color="danger" fontWeight="bold">
						{{ errorMessage }}
					</MaterialAlert>
				 </div>
				  <div
					class="d-flex justify-content-between align-items-center mb-6"
				  >
					<h3 class="mb-0">AP {{ apId }} Setting:</h3>

				  </div>
				  <div class="container">
					<div class="row">
						
                    <!--Comport-->
                    <div class="col-12 d-flex align-items-center">
                      <label for="COMSelect" class="h4 me-2 mb-6">Comport:</label>
                      <select id="COMSelect" class="form-select ms-4 mb-6" v-model="selectedCOM" style="padding: 2%; border: 1px solid #ccc; width: 14%;">
                        <option v-for="com in 200" :value="com">{{ com }}</option>
                      </select>
                      <div v-show="selectedCOM">
                        <div class="ms-7">
                          <MaterialButton
                            class="text-nowrap mb-6"
                            :variant="isAppliedCOM ? 'grey' : 'outline'"
                            :color="isAppliedCOM ? 'grey' : 'success'"
                            :disabled="isAppliedCOM"
                            size="sm"
                            @click="handleCOMApply"
                          >
                            Apply
                          </MaterialButton>
                        </div>
                      </div>
                    </div>
					
					<!--Model-->
					<div class="col-12 d-flex align-items-center">
						<label for="modelSelect" class="h4 me-2 mb-6">Model:</label>
							<select id="modelSelect" class="form-select ms-2 mb-6" v-model="selectedModel"  style="padding: 2%; border: 1px solid #ccc; width: 45%;">
							  <option v-for="model in dutModelList" :value=" model" >{{ model }}</option>
							</select>
							<div v-show="selectedModel">
								<div class="ms-7">
									<MaterialButton
									  class="text-nowrap mb-6"
									  :variant="isAppliedModel ? 'grey' : 'outline'"
									  :color="isAppliedModel ? 'grey' : 'success'"
									  :disabled="isAppliedModel"
									  size="sm"
									  @click="handleModelApply"
									>
									  Apply
									</MaterialButton>
								</div>
							</div>
					  </div>
															
					
					<!--Country-->
					<div class="col-12 d-flex align-items-center mb-5">
					  <label class="h4 me-2 mb-5">Country:</label>
					  <div class="table-responsive ms-2">
					    <table class="table">
					  	<tbody>
					  	  <tr v-for="(chunk, index) in chunkedCountries" :key="index">
					  		<td v-for="country in chunk" :key="country">
					  		  <div class="form-check">
					  			<input class="form-check-input" type="checkbox" :value="country" v-model="selectedCountries">
					  			<label class="form-check-label">{{ country }}</label>
					  		  </div>
					  		</td>
					  	  </tr>
					  	</tbody>
					    </table>
					  </div>

					<div v-show="selectedCountries.length > 0">
					  <MaterialButton
						class="text-nowrap mb-0 ms-5"
						:variant="isAppliedCountry ? 'grey' : 'outline'"
						:color="isAppliedCountry ? 'grey' : 'success'"
						:disabled="isAppliedCountry"
						color="success"
						size="sm"
						@click="handleCountryApply"
					  >
						Apply
					  </MaterialButton>
					</div>
					</div>

					 
					  
					  
					<!--Mode-->
					<div class="col-12 d-flex align-items-center mb-6">
						<label class="h4 me-2 mb-0">Mode:</label>
						<div class="form-check form-check-inline mb-0">
						  <input class="form-check-input" type="checkbox" id="checkboxMaster" value="Master" v-model="selectedModes">
						  <label class="form-check-label fw-bold" for="checkboxMaster">Master</label>
						</div>
						<div class="form-check form-check-inline mb-0">
						  <input class="form-check-input" type="checkbox" id="checkboxAP" value="AP" v-model="selectedModes">
						  <label class="form-check-label fw-bold" for="checkboxAP">AP</label>
						</div>


						<div v-show="selectedModes.length > 0">
							<div class="ms-8">
							  <MaterialButton
								class="text-nowrap mb-0"
								:variant="isAppliedMode ? 'grey' : 'outline'"
								:color="isAppliedMode ? 'grey' : 'success'"
								:disabled="isAppliedMode"
								color="success"
								size="sm"
								@click="handleModeApply"
							  >
								Apply
							  </MaterialButton>
						</div>
						</div>
					 </div>
					
					<!--RF Band-->
					<div class="md-layout md-gutter mb-5">		
						<label class="h4 me-2">RF Band:</label>
						<div class="d-flex align-items-center">
						  <el-select v-model="selectedRfBand" name="bands" id="bands" multiple  class="ms-2 mb-2" style="padding: 2%; width: 50%;">
							<el-option value="5GHz">5GHz</el-option>
							<el-option value="2.4GHz">2.4GHz</el-option>
							<el-option value="2.4&5GHz">2.4GHz & 5GHz</el-option>
						  </el-select>
						  <div v-show="selectedRfBand.length > 0">
						  	<div class="ms-2">
						  	  <MaterialButton
						  		class="text-nowrap mb-0"
						  		:variant="isAppliedRFband ? 'grey' : 'outline'"
						  		:color="isAppliedRFband ? 'grey' : 'success'"
						  		:disabled="isAppliedRFband"
						  		color="success"
						  		size="sm"
						  		@click="handleRFbandClick"
						  	  >
						  		Apply
						  	  </MaterialButton>
						    </div>
						  </div>
						</div>  
					</div>
					
					
					<div v-if="rfType_dict['2.4&5GHz']">
					
						<label class="h5 me-2 mb-4">2.4GHz & 5GHz RF Type:</label>
						<div class="col-12 d-flex align-items-center mb-5 flex-wrap">
							<div v-for="rfType_24Gand5G in filteredRfTypes" :key="rfType_24Gand5G" class="form-check form-check-inline col-4">
								  <input class="form-check-input" type="checkbox" :id="rfTypeid_24Gand5G" :value="rfType_24Gand5G" v-model="selectedRfType_24Gand5G" />
								  <label :for="rfType_24Gand5G" class="form-check-label fw-bold">{{ rfType_24Gand5G.toUpperCase() }}</label>
							</div>
							
							<div v-show="selectedRfType_24Gand5G.length > 0">
								<div class="ms-12">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isAppliedRFtype_24Gand5G ? 'grey' : 'outline'"
									:color="isAppliedRFtype_24Gand5G ? 'grey' : 'success'"
									:disabled="isAppliedRFtype_24Gand5G"
									color="success"
									size="sm"
									@click="handleRFtypeApply_24Gand5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>

						<!--2.4GHz & 5GHz Channel-->
						<div class="col-14 d-flex align-items-center mb-6">
							<label class="h4">2.4GHz & 5GHz Channel:</label>
							<el-select v-model="selectedChannel_24Gand5G" multiple placeholder="Select channels" class="ms-2" style="padding: 2%; width: 35%;">
								<el-option
									v-for="channel_24Gand5G in dutChannelList"
									:key="channel_24Gand5G"
									:label="channel_24Gand5G"
									:value="channel_24Gand5G">
								</el-option>
							</el-select>

							<div v-show="selectedChannel_24Gand5G.length > 0">
								<div class="ms-2">
									<MaterialButton
										class="text-nowrap mb-0"
										:variant="isClicked ? 'grey' : 'outline'"
										color="success"
										size="sm"
										@click="handleChannel_24Gand5G"
									>
										Apply
									</MaterialButton>
								</div>
							</div>
						</div>

						
						<!--2.4GHz & 5GHz Channel Bandwidth-->
						<div class="col-14 d-flex align-items-center mb-6">
							<label class="h5">2.4GHz & 5GHz Channel Bandwidth:</label>
							
							<div class="d-flex flex-wrap">
								<div v-for="bandwidth_24Gand5G in dutChannelBandList" :key="bandwidth_24Gand5G" class="form-check form-check-inline col-5">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="bandwidthid_24Gand5G"
									:value="bandwidth_24Gand5G"
									v-model="selectedBandwidth_24Gand5G"
								  />
								  <label :for="bandwidth_24Gand5G" class="form-check-label fw-bold">{{ bandwidth_24Gand5G }}</label>
								</div>
							</div>


							<div v-show="selectedBandwidth_24Gand5G.length > 0">
								<div class="ms-2 mb-5">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleChBandwidth_24Gand5G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>
						
						<!--2.4GHz & 5GHz Security Mode-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2 mb-0">2.4GHz & 5GHz Security Mode:</label>
								<div v-for="securitymode_24Gand5G in dutSecurityModeList" :key="securitymode_24Gand5G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="securitymodeid_24Gand5G"
									:value="securitymode_24Gand5G"
									v-model="selectedSecurityMode_24Gand5G"
								  />
								  <label :for="securitymode_24Gand5G" class="form-check-label fw-bold">{{ securitymode_24Gand5G }}</label>
								</div>



							<div v-show="selectedSecurityMode_24Gand5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleSecurityMode_24Gand5G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>					  
						  
						  
						  
						<!--2.4GHz & 5GHz 802.11w-->
						<div class="col-12 d-flex align-items-center mb-6">
						<label class="h4 me-2 mb-0">2.4GHz & 5GHz 802.11w:</label>
							<div v-for="PMF_24Gand5G in dut80211wList" :key="PMF_24Gand5G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="PMFid_24Gand5G"
									:value="PMF_24Gand5G"
									v-model="selected80211_24Gand5G"
								  />
								  <label :for="PMF_24Gand5G" class="form-check-label fw-bold">{{ PMF_24Gand5G }}</label>
							</div>

							<div v-show="selected80211_24Gand5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handle80211w_24Gand5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>	


						  
						<!--2.4GHz & 5GHz Security-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2 mb-5">2.4GHz & 5GHz Security:</label>
							<table class="table">
							  <tbody>
								<tr v-for="(chunk, index) in chunkedSecurityList" :key="index">
								  <td v-for="security_24Gand5G in chunk" :key="security_24Gand5G">
									<div class="form-check">
									  <input
										class="form-check-input"
										type="checkbox"
										:id="securitySelect_24Gand5G"
										:value="security_24Gand5G"
										v-model="selectedSecurity_24Gand5G"
									  />
									  <label class="form-check-label fw-bold" :for="securitySelect_24Gand5G">{{ security_24Gand5G }}</label>
									</div>
								  </td>
								</tr>
							  </tbody>
							</table>

							<div v-show="selectedSecurity_24Gand5G.length > 0">
								<div class="ms-3">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleSecurity_24Gand5G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>			




						<!--2.4GHz & 5GHz Security Encryption-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2">2.4GHz & 5GHz Encryption:</label>
							<div v-for="encryption_24Gand5G in dutEncryptionList" :key="encryption_24Gand5G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="encryptionSelect_24Gand5G"
									:value="encryption_24Gand5G"
									v-model="selectedEncryption_24Gand5G"
								  />
								  <label :for="encryption_24Gand5G" class="form-check-label fw-bold">{{ encryption_24Gand5G }}</label>
							</div>

							<div v-show="selectedEncryption_24Gand5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleEncryption_24Gand5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>
						  
						<!--2.4GHz & 5GHz Antenna-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2">2.4GHz & 5GHz Antenna:</label>
							<div v-for="antenna_24Gand5G in dutAntennaList" :key="antenna_24Gand5G" class="form-check form-check-inline col-1">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="antennaSelect_24Gand5G"
									:value="antenna_24Gand5G"
									v-model="selectedAntenna_24Gand5G"
								  />
								  <label :for="antenna_24Gand5G" class="form-check-label fw-bold">{{ antenna_24Gand5G }}</label>
							</div>

							<div v-show="selectedAntenna_24Gand5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleAntenna_24Gand5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div> 
						  
						  
					</div>
					<div v-if="rfType_dict['5GHz']">
					
						<label class="h5 me-2 mb-4">5GHz RF Type:</label>
						<div class="col-12 d-flex align-items-center mb-5 flex-wrap">
							<div v-for="rfType_5G in rfType_dict['5GHz']" :key="rfType_5G" class="form-check form-check-inline col-4">
								  <input class="form-check-input" type="checkbox" :id="rfType_5G" :value="rfType_5G" v-model="selectedRfType_5G" />
								  <label :for="rfType_5G" class="form-check-label fw-bold">{{ rfType_5G.toUpperCase() }}</label>
							</div>
							
							<div v-show="selectedRfType_5G.length > 0">
								<div class="ms-12">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isAppliedRFtype_5G ? 'grey' : 'outline'"
									:color="isAppliedRFtype_5G ? 'grey' : 'success'"
									:disabled="isAppliedRFtype_5G"
									color="success"
									size="sm"
									@click="handleRFtypeApply_5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>

						<!--5GHz Channel-->
						<div class="col-14 d-flex align-items-center mb-6">
							<label class="h4">5GHz Channel:</label>
							
							<!-- Element UI Select Component -->
							<el-select v-model="selectedChannel_5G" multiple placeholder="Select channels" class="ms-2" style="padding: 2%; width: 35%;">
								<el-option
									v-for="channel5G in filtered5GChannelList"
									:key="channel5G"
									:label="channel5G"
									:value="channel5G">
								</el-option>
							</el-select>

							<div v-show="selectedChannel_5G.length > 0">
								<div class="ms-2">
									<MaterialButton
										class="text-nowrap mb-0"
										:variant="isClicked ? 'grey' : 'outline'"
										color="success"
										size="sm"
										@click="handleChannel_5G"
									>
										Apply
									</MaterialButton>
								</div>
							</div>
						</div>
						
						<!--5GHz Channel Bandwidth-->
						<div class="col-14 d-flex align-items-center mb-6">
							<label class="h5">5GHz Channel Bandwidth:</label>
							
							<div class="d-flex flex-wrap">
								<div v-for="bandwidth_5G in dutChannelBandList" :key="bandwidth_5G" class="form-check form-check-inline col-5">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="bandwidthid_5G"
									:value="bandwidth_5G"
									v-model="selectedBandwidth_5G"
								  />
								  <label :for="bandwidth_5G" class="form-check-label fw-bold">{{ bandwidth_5G }}</label>
								</div>
							</div>


							<div v-show="selectedBandwidth_5G.length > 0">
								<div class="ms-2 mb-5">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleChBandwidth_5G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>
						
						<!--5GHz Security Mode-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2 mb-0">5GHz Security Mode:</label>
								<div v-for="securitymode_5G in dutSecurityModeList" :key="securitymode_5G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="securitymodeid_5G"
									:value="securitymode_5G"
									v-model="selectedSecurityMode_5G"
								  />
								  <label :for="securitymode_5G" class="form-check-label fw-bold">{{ securitymode_5G }}</label>
								</div>



							<div v-show="selectedSecurityMode_5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleSecurityMode_5G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>					  
						  
						  
						  
						<!--5GHz 802.11w-->
						<div class="col-12 d-flex align-items-center mb-6">
						<label class="h4 me-2 mb-0">5GHz 802.11w:</label>
							<div v-for="PMF_5G in dut80211wList" :key="PMF_5G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="PMFid_5G"
									:value="PMF_5G"
									v-model="selected80211_5G"
								  />
								  <label :for="PMF_5G" class="form-check-label fw-bold">{{ PMF_5G }}</label>
							</div>

							<div v-show="selected80211_5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handle80211w_5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>	


						  
						<!--5GHz Security-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2 mb-5">5GHz Security:</label>
							<table class="table">
							  <tbody>
								<tr v-for="(chunk, index) in chunkedSecurityList" :key="index">
								  <td v-for="security_5G in chunk" :key="security_5G">
									<div class="form-check">
									  <input
										class="form-check-input"
										type="checkbox"
										:id="securitySelect_5G"
										:value="security_5G"
										v-model="selectedSecurity_5G"
									  />
									  <label class="form-check-label fw-bold" :for="securitySelect_5G">{{ security_5G }}</label>
									</div>
								  </td>
								</tr>
							  </tbody>
							</table>

							<div v-show="selectedSecurity_5G.length > 0">
								<div class="ms-3">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleSecurity_5G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>			




						<!--5GHz Security Encryption-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2">5GHz Encryption:</label>
							<div v-for="encryption_5G in dutEncryptionList" :key="encryption_5G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="encryptionSelect_5G"
									:value="encryption_5G"
									v-model="selectedEncryption_5G"
								  />
								  <label :for="encryption_5G" class="form-check-label fw-bold">{{ encryption_5G }}</label>
							</div>

							<div v-show="selectedEncryption_5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleEncryption_5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>
						  
						<!--5GHz Antenna-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2">5GHz Antenna:</label>
							<div v-for="antenna_5G in dutAntennaList" :key="antenna_5G" class="form-check form-check-inline col-1">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="antennaSelect_5G"
									:value="antenna_5G"
									v-model="selectedAntenna_5G"
								  />
								  <label :for="antenna_5G" class="form-check-label fw-bold">{{ antenna_5G }}</label>
							</div>

							<div v-show="selectedAntenna_5G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleAntenna_5G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div> 
						  
						  
					</div>
					<div v-if="rfType_dict['2.4GHz']">
					
						<label class="h5 me-2 mb-4">2.4GHz RF Type:</label>
						<div class="col-12 d-flex align-items-center mb-5 flex-wrap">
							<div v-for="rfType_24G in rfType_dict['2.4GHz']" :key="rfType_24G" class="form-check form-check-inline col-4">
								  <input class="form-check-input" type="checkbox" :id="rfTypeid_24G" :value="rfType_24G" v-model="selectedRfType_24G" />
								  <label :for="rfType_24G" class="form-check-label fw-bold">{{ rfType_24G.toUpperCase() }}</label>
							</div>
							
							<div v-show="selectedRfType_24G.length > 0">
								<div class="ms-12">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isAppliedRFtype_24G ? 'grey' : 'outline'"
									:color="isAppliedRFtype_24G ? 'grey' : 'success'"
									:disabled="isAppliedRFtype_24G"
									color="success"
									size="sm"
									@click="handleRFtypeApply_24G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>

						<!--2.4GHz Channel-->
						<div class="col-14 d-flex align-items-center mb-6">
							<label class="h4">2.4GHz Channel:</label>
							
							<!-- Element UI Select Component -->
							<el-select v-model="selectedChannel_24G" multiple placeholder="Select channels" class="ms-2" style="padding: 2%; width: 35%;">
								<el-option
									v-for="channel24G in filtered24GChannelList"
									:key="channel24G"
									:label="channel24G"
									:value="channel24G">
								</el-option>
							</el-select>

							<div v-show="selectedChannel_24G.length > 0">
								<div class="ms-2">
									<MaterialButton
										class="text-nowrap mb-0"
										:variant="isClicked ? 'grey' : 'outline'"
										color="success"
										size="sm"
										@click="handleChannel_24G"
									>
										Apply
									</MaterialButton>
								</div>
							</div>
						</div>
						
						<!--2.4GHz Channel Bandwidth-->
						<div class="col-14 d-flex align-items-center mb-6">
							<label class="h5">2.4GHz Channel Bandwidth:</label>
							
							<div class="d-flex flex-wrap">
								<div v-for="bandwidth_24G in dutChannelBandList" :key="bandwidth_24G" class="form-check form-check-inline col-5">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="bandwidthid_24G"
									:value="bandwidth_24G"
									v-model="selectedBandwidth_24G"
								  />
								  <label :for="bandwidth_24G" class="form-check-label fw-bold">{{ bandwidth_24G }}</label>
								</div>
							</div>


							<div v-show="selectedBandwidth_24G.length > 0">
								<div class="ms-2 mb-5">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleChBandwidth_24G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>
						
						<!--2.4GHz Security Mode-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2 mb-0">2.4GHz Security Mode:</label>
								<div v-for="securitymode_24G in dutSecurityModeList" :key="securitymode_24G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="securitymodeid_24G"
									:value="securitymode_24G"
									v-model="selectedSecurityMode_24G"
								  />
								  <label :for="securitymode_24G" class="form-check-label fw-bold">{{ securitymode_24G }}</label>
								</div>



							<div v-show="selectedSecurityMode_24G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleSecurityMode_24G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>					  
						  
						  
						  
						<!--2.4GHz 802.11w-->
						<div class="col-12 d-flex align-items-center mb-6">
						<label class="h4 me-2 mb-0">2.4GHz 802.11w:</label>
							<div v-for="PMF_24G in dut80211wList" :key="PMF_24G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="PMFid_24G"
									:value="PMF_24G"
									v-model="selected80211_24G"
								  />
								  <label :for="PMF_24G" class="form-check-label fw-bold">{{ PMF_24G }}</label>
							</div>

							<div v-show="selected80211_24G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handle80211w_24G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>	


						  
						<!--2.4GHz Security-->
						<div class="col-12 d-flex align-items-center mb-5">
							<label class="h4 me-2 mb-5">2.4GHz Security:</label>
							<table class="table">
							  <tbody>
								<tr v-for="(chunk, index) in chunkedSecurityList" :key="index">
								  <td v-for="security_24G in chunk" :key="security_24G">
									<div class="form-check">
									  <input
										class="form-check-input"
										type="checkbox"
										:id="securitySelect_24G"
										:value="security_24G"
										v-model="selectedSecurity_24G"
									  />
									  <label class="form-check-label fw-bold" :for="securitySelect_24G">{{ security_24G }}</label>
									</div>
								  </td>
								</tr>
							  </tbody>
							</table>

							<div v-show="selectedSecurity_24G.length > 0">
								<div class="ms-3">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleSecurity_24G"
								  >
									Apply
								  </MaterialButton>
							</div>
							</div>
						</div>			




						<!--2.4GHz Security Encryption-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-2">2.4GHz Encryption:</label>
							<div v-for="encryption_24G in dutEncryptionList" :key="encryption_24G" class="form-check form-check-inline col-3">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="encryptionSelect_24G"
									:value="encryption_24G"
									v-model="selectedEncryption_24G"
								  />
								  <label :for="encryption_24G" class="form-check-label fw-bold">{{ encryption_24G }}</label>
							</div>

							<div v-show="selectedEncryption_24G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleEncryption_24G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div>
						  
						<!--2.4GHz Antenna-->
						<div class="col-12 d-flex align-items-center mb-6">
							<label class="h4 me-4">2.4GHz Antenna:</label>
							<div v-for="antenna_24G in dutAntennaList" :key="antenna_24G" class="form-check form-check-inline col-2">
								  <input
									class="form-check-input"
									type="checkbox"
									:id="antennaSelect_24G"
									:value="antenna_24G"
									v-model="selectedAntenna_24G"
								  />
								  <label :for="antenna_24G" class="form-check-label fw-bold">{{ antenna_24G }}</label>
							</div>

							<div v-show="selectedAntenna_24G.length > 0">
								<div class="ms-2">
								  <MaterialButton
									class="text-nowrap mb-0"
									:variant="isClicked ? 'grey' : 'outline'"
									color="success"
									size="sm"
									@click="handleAntenna_24G"
								  >
									Apply
								  </MaterialButton>
								</div>
							</div>
						</div> 
						  
						  
					</div>
					

					
					  
					  
					
					  
					  

					<!--- Not Developed--->
					<!--Data Rate-->
					<div class="col-12 d-flex align-items-center mb-0">
						<label class="h4 me-2 mb-5">Data Rate:</label>
						<select id="datarateSelect" class="form-select ms-2 mb-5" v-model="selectedDatarate" disabled style="padding: 2%; border: 1px solid #ccc; width: 35%;">
						  <option v-for="datarate in dutDatarateList" :value="datarate">{{ datarate }}</option>
						</select>

						<div v-show="selectedDatarate">
							<div class="ms-6 mb-5">
							  <MaterialButton
								class="text-nowrap mb-0"
								:variant="isClicked ? 'grey' : 'outline'"
								color="success"
								size="sm"
								@click="handleRFbandClick"
							  >
								Apply
							  </MaterialButton>
						</div>
						</div>
					  </div>



					<!--Mgmt Rate-->
					<div class="col-12 d-flex align-items-center mb-0">
						<label class="h4 me-2 mb-5">Mgmt Rate:</label>
						<select id="mgmtrateSelect" class="form-select ms-2 mb-5" v-model="selectedMgmtrate" disabled style="padding: 2%; border: 1px solid #ccc; width: 35%;">
						  <option v-for="mgmt in dutMgmtrateList" :value="mgmt">{{ mgmt }}</option>
						</select>

						<div v-show="selectedMgmtrate">
							<div class="ms-6 mb-5">
							  <MaterialButton
								class="text-nowrap mb-0"
								:variant="isClicked ? 'grey' : 'outline'"
								color="success"
								size="sm"
								@click="handleRFbandClick"
							  >
								Apply
							  </MaterialButton>
						</div>
						</div>
					  </div>



					<!--Broadcast/Multicast Rate-->
					<div class="col-12 d-flex align-items-center mb-0">
						<label class="h4 me-2 mb-5">Broadcast/Multicast Rate:</label>
						<select id="bcastrateSelect" class="form-select ms-2 mb-5" v-model="selectedBcastrate" disabled style="padding: 2%; border: 1px solid #ccc; width: 35%;">
						  <option v-for="bcastrate in dutBcastrateList" :value="bcastrate">Under Development"</option>
						</select>

						<div v-show="selectedBcastrate">
							<div class="ms-6 mb-5">
							  <MaterialButton
								class="text-nowrap mb-0"
								:variant="isClicked ? 'grey' : 'outline'"
								color="success"
								size="sm"
								@click="handleRFbandClick"
							  >
								Apply
							  </MaterialButton>
							</div>
						</div>
					  </div>

							  
							  

					
				</div>

				</div>
				  
					<div class="d-flex justify-content-center mt-3">
					  <MaterialButton
						class="text-nowrap"
						:variant="'outline'"
						color="primary"
						size="md"
						@click="goHome"
					  >
						Back to Home
					  </MaterialButton>
					</div>

				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </section>
</template>

