#!/usr/bin/env bash
# Script: Cloud Database Seeding
# Purpose: Seed the deployed Aurora database through the auth Lambda

set -e

SCRIPT_DIR="$(cd "$(dirname "$0")" > /dev/null 2>&1 || exit 1; pwd -P)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." > /dev/null 2>&1 || exit 1; pwd -P)"
ENVIRONMENT_CONFIG="$PROJECT_ROOT/ENVIRONMENT.config"

export PATH="$HOME/.local/bin:$PATH"
export AWS_REGION="${AWS_REGION:-ap-south-1}"

if [ -f "$ENVIRONMENT_CONFIG" ]; then
    # shellcheck disable=SC1090
    source "$ENVIRONMENT_CONFIG"
fi

PROJECT_NAME="${TF_VAR_aws_project:-${PROJECT_NAME:-coding-workshop}}"
APP_CODE="${TF_VAR_aws_app_code:-${PARTICIPANT_ID:-}}"

if [ -z "$APP_CODE" ]; then
    echo "ERROR: Could not determine app code / participant id for cloud seeding."
    exit 1
fi

FUNCTION_NAME="${PROJECT_NAME}-auth-service-${APP_CODE}"
TMP_META="/tmp/${FUNCTION_NAME}-seed-meta.json"
TMP_BODY="/tmp/${FUNCTION_NAME}-seed-body.json"

echo "INFO: Seeding deployed database via Lambda..."
echo "INFO: Target function - $FUNCTION_NAME"

aws lambda invoke \
    --region "$AWS_REGION" \
    --cli-binary-format raw-in-base64-out \
    --function-name "$FUNCTION_NAME" \
    --payload '{"action":"seed"}' \
    "$TMP_BODY" \
    > "$TMP_META"

if ! grep -q '"StatusCode": 200' "$TMP_META"; then
    echo "ERROR: Lambda invoke failed"
    cat "$TMP_META"
    exit 1
fi

echo "INFO: Seed response:"
cat "$TMP_BODY"
echo ""

if grep -q '"statusCode": 200' "$TMP_BODY"; then
    echo "INFO: Cloud database seeding completed."
    exit 0
fi

echo "ERROR: Cloud database seeding failed."
exit 1
