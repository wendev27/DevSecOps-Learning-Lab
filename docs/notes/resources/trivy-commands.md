# Quick trick to make the output readable

# Only show high-severity findings:

trivy image --severity HIGH,CRITICAL my-first-image

# Show only the summary:

trivy image --severity HIGH,CRITICAL --format table my-first-image

# Count vulnerabilities without flooding:

trivy image --severity HIGH,CRITICAL --quiet my-first-image
