<script lang="ts">
	import DynamicPage from '$lib/components/dynamicPage/DynamicPage.svelte';
	import Tab from '$lib/components/tabs/Tab.svelte';
	import Tabs from '$lib/components/tabs/Tabs.svelte';
	import LoginForm from './LoginForm.svelte';
	import SignupForm from './SignupForm.svelte';
</script>

<DynamicPage class="max-w-[512px]" title="Authenticate">
	<Tabs>
		<Tab label="Login">
			<LoginForm />
		</Tab>

		<Tab label="Sign up">
			<SignupForm />
		</Tab>
	</Tabs>
</DynamicPage>
